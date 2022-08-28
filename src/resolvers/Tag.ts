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
    const tags = await dataSource.getRepository(Tag).find();
    return tags;
  }

  @Mutation(() => Tag)
  async editTag(@Arg("id") id: string, @Arg("name") name: string) {
    const dataSource = await getDataSource();
    const tag = await dataSource.getRepository(Tag).findOne({ where: { id } });
    if (tag) {
      if (!tag.categoryId && !tag.disciplineId) {
        console.log("here");
        tag.name = name;
        console.log(tag);
        await dataSource.getRepository(Tag).save(tag);
        return tag;
      }
      return tag;
    } else {
      throw new Error("tag wasn't found");
    }
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const tag = await dataSource.getRepository(Tag).findOne({ where: { id } });
    if (tag) {
      await dataSource.getRepository(Tag).remove(tag);
      return true;
    } else {
      return false;
    }
  }

  @Query(() => String)
  async getResultsTagId() {
    const dataSource = await getDataSource();
    return (
      await dataSource
        .getRepository(Tag)
        .findOne({ where: { name: "Výsledky" } })
    )?.id;
  }
}
