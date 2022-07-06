import { getSession } from "next-auth/react";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { MyContext } from "../types/MyContext";
import { ROLES } from "../types/roles";

@Resolver()
export class UserResolver {
  @Query(() => Boolean)
  hello() {
    return false;
  }

  @Query(() => [User])
  async getAllUsers() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(User).find();
  }

  @Mutation(() => Post)
  async createPost(): Promise<Post> {
    const dataSource = await getDataSource();
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

  @Mutation(() => User)
  async changeRoleOfMe(@Arg("role") role: string) {
    console.log(role as ROLES);
    console.log(ROLES.ADMIN);
    const dataSource = await getDataSource();
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { email: "bachraty1@gamca.sk" } });
    if (user) {
      user.role = role as ROLES;
      console.log(user.role);
      dataSource.getRepository(User).save(user);
      return user;
    } else {
      throw new Error("error");
    }
  }

  @Mutation(() => Boolean)
  async deleteAllUsers() {
    const dataSource = await getDataSource();
    dataSource.getRepository(User).delete({});
    return true;
  }
}
