import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Tag } from "../entities/Tag";

@Resolver()
export class TagResolver {
  @Mutation(() => Tag)
  async createTag(@Arg("name") name: string) {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Tag).create({ name }).save();
  }
  @Query(() => [Tag])
  async getTags() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Tag).find();
  }
}
