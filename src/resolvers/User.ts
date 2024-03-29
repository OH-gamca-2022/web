import { getSession } from "next-auth/react";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { requirePersmission } from "../middleware/requirePermission";
import { MyContext } from "../types/MyContext";
import { ROLES } from "../types/roles";

@Resolver()
export class UserResolver {
  @Query(() => Boolean)
  hello() {
    return false;
  }

  @Query(() => [User])
  @UseMiddleware(requirePersmission(ROLES.ADMIN))
  async getAllUsers() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(User).find();
  }

  @Query(() => Boolean)
  async checkSession(@Ctx() ctx: MyContext) {
    const session = await getSession({ req: ctx.req });
    console.log(session);
    return true;
  }

  @Mutation(() => User)
  @UseMiddleware(requirePersmission(ROLES.ADMIN))
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

  @Mutation(() => User)
  @UseMiddleware(requirePersmission(ROLES.ADMIN))
  async changeRoleOfUser(
    @Arg("userId") userId: string,
    @Arg("role") role: string
  ) {
    const dataSource = await getDataSource();
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id: userId } });
    if (user) {
      user.role = role as ROLES;
      dataSource.getRepository(User).save(user);
      return user;
    } else {
      throw new Error("error");
    }
  }
}
