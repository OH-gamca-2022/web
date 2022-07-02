import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Tag } from "../entities/Tag";

const dataSource = getDataSource();

@Resolver()
export class TagResolver {
  @Mutation(() => Tag)
  createTag(@Arg("name") name: string) {
    return dataSource.getRepository(Tag).create({ name }).save();
  }
  @Query(() => [Tag])
  getTags() {
    return dataSource.getRepository(Tag).find();
  }
}
