import { Query, Resolver } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { User } from "../entities/User";

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
}
