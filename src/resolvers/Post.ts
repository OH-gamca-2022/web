import dayjs from "dayjs";
import {
  Field,
  Arg,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { requirePersmission } from "../middleware/requirePermission";
import { ROLES } from "../types/roles";

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts!: Post[];

  @Field(() => Int)
  numOfPages!: number;
}
@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 150);
  }

  @Query(() => [Post])
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async getPosts(
    @Arg("page", { nullable: true }) page: number,
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<Post[]> {
    const dataSource = await getDataSource();
    const posts = await dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.tags", "tag")
      .skip(limit && page ? limit * page : 0)
      .take(limit ? limit : 50)
      .getMany();

    posts.sort((a, b) => dayjs(b.createdAt).diff(a.createdAt));
    return posts;
  }

  @Query(() => Post)
  async getPost(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(Post)
      .findOne({ where: { id }, relations: { tags: true } });
  }

  @Query(() => PaginatedPosts)
  async getPublishedPosts(
    @Arg("page", { nullable: true }) page: number,
    @Arg("limit", { nullable: true }) limit: number,
    @Arg("tagIds", () => [String], { nullable: true }) tagIds?: string[]
  ): Promise<PaginatedPosts> {
    const dataSource = await getDataSource();
    const qb = dataSource.getRepository(Post).createQueryBuilder("post");

    const startIndex = limit && page ? limit * page : 0;
    const realLimit = limit ? limit : 50;

    const publishedPostsQb = qb
      .where("post.published = :published", {
        published: true,
      })
      .leftJoinAndSelect("post.tags", "tags");

    let finalPosts: Post[] = [];
    let numOfPages: number = 1;

    if (tagIds && tagIds.length > 0) {
      const posts = await publishedPostsQb.getMany();
      const filteredPosts = posts.filter((post) => {
        const tags = post.tags?.map((tag) => tag.id);

        const hasAllTags = tagIds.every((item) => {
          return tags?.includes(item);
        });

        if (hasAllTags) {
          return true;
        } else {
          return false;
        }
      });

      numOfPages = Math.ceil(filteredPosts.length / realLimit);
      finalPosts = filteredPosts.slice(startIndex, startIndex + realLimit);
    } else {
      numOfPages = Math.ceil((await publishedPostsQb.getCount()) / realLimit);

      const paginatedPosts = await publishedPostsQb
        .orderBy("post.publishDate", "DESC")
        .skip(startIndex)
        .take(realLimit)
        .getMany();

      finalPosts = paginatedPosts;
    }

    return {
      posts: finalPosts,
      numOfPages,
    };
  }

  @Mutation(() => Post)
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async savePost(
    @Arg("title") title: string,
    @Arg("published") published: boolean,
    @Arg("tagIds", () => [String], { nullable: true }) tagIds: string[],
    @Arg("id", { nullable: true }) id?: string,
    @Arg("subtitle", { nullable: true }) subtitle?: string,
    @Arg("text", { nullable: true }) text?: string
  ): Promise<Post> {
    const dataSource = await getDataSource();
    let post;
    if (id) {
      post = await dataSource.getRepository(Post).findOne({ where: { id } });
    }
    if (!post) {
      post = await dataSource
        .getRepository(Post)
        .create({ title, text })
        .save();
    }
    console.log(tagIds);
    if (tagIds && tagIds.length > 0) {
      const tags = await dataSource
        .createQueryBuilder(Tag, "tag")
        .where("tag.id IN (:...ids)", { ids: tagIds })
        .getMany();
      console.log(tags);
      post.tags = tags;
    }

    if (!post.published && published) {
      post.publishDate = new Date();
    }
    post.published = published;
    if (text) {
      post.text = text;
    }
    post.title = title;
    post.subtitle = subtitle;
    console.log(post);
    await dataSource.getRepository(Post).save(post);
    console.log(post);
    return post;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async deletePost(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const post = await dataSource
      .getRepository(Post)
      .findOne({ where: { id } });
    if (!post) {
      return false;
    }
    await dataSource.getRepository(Post).remove(post);
    console.log(await dataSource.getRepository(Post).find());
    return true;
  }
}
