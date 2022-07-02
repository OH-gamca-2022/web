import { getSession } from "next-auth/react";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { MyContext } from "../types/MyContext";

const dataSource = getDataSource();

@Resolver()
export class UserResolver {
  @Query(() => Boolean)
  hello() {
    return false;
  }

  @Query(() => [User])
  getAllUsers() {
    return dataSource.getRepository(User).find();
  }

  @Mutation(() => Post)
  async createPost(): Promise<Post> {
    console.log("Create post");
    const tag = await dataSource
      .getRepository(Tag)
      .create({ name: "tag1" })
      .save();
    const post = await dataSource
      .getRepository(Post)
      .create({ text: "something", title: "Post1" })
      .save();
    post.tags = [tag];
    dataSource.getRepository(Post).save(post);
    return post;
  }

  @Query(() => Boolean)
  async checkSession(@Ctx() ctx: MyContext) {
    const session = await getSession({ req: ctx.req });
    console.log(session);
    return true;
  }
}
