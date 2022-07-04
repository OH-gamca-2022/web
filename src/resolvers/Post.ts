import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { ROLES } from "../entities/User";
import { requirePersmission } from "../middleware/requirePermission";

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 150);
  }

  @Query(() => [Post])
  async getPosts(
    @Arg("page", { nullable: true }) page: number,
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<Post[]> {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.tags", "tag")
      .skip(limit && page ? limit * page : 0)
      .take(limit ? limit : 50)
      .getMany();
  }

  @Query(() => [Post])
  @UseMiddleware(requirePersmission(ROLES.ADMIN))
  async getPublishedPosts(
    @Arg("page", { nullable: true }) page: number,
    @Arg("limit", { nullable: true }) limit: number
  ) {
    const dataSource = await getDataSource();
    const posts = await dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.tags", "tag")
      .skip(limit && page ? limit * page : 0)
      .take(limit ? limit : 50)
      .getMany();
    return posts.filter((post) => post.published == true);
  }

  @Mutation(() => Post)
  async savePost(
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Arg("published") published: boolean,
    @Arg("tagIds", () => [String], { nullable: true }) tagIds: string[],
    @Arg("id", { nullable: true }) id?: string
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
    const tags = await dataSource
      .createQueryBuilder(Tag, "tag")
      .where("tag.id IN (:...ids)", { ids: tagIds })
      .getMany();
    console.log(tags);
    post.tags = tags;

    if (!post.published && published) {
      post.publishDate = new Date();
    }
    post.published = published;
    post.text = text;
    post.title = title;

    await dataSource.getRepository(Post).save(post);
    console.log(
      await dataSource.getRepository(Post).find({ relations: { tags: true } })
    );
    return post;
  }

  @Mutation(() => Boolean)
  async deleteAllPosts() {
    const dataSource = await getDataSource();
    const posts = await dataSource.getRepository(Post).find();
    await dataSource.getRepository(Post).remove(posts);
    return true;
  }
}
