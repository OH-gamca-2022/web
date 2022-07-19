import { google } from "googleapis";
import { Arg, Resolver } from "type-graphql";
import { Query, Mutation } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    const dataSource = await getDataSource();
    const result = await dataSource
      .getRepository(Category)
      .find({ relations: { disciplines: true } });

    return result;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("name") name: string) {
    const dataSource = await getDataSource();

    const tag = await dataSource.getRepository(Tag).create({ name }).save();

    const category = new Category();
    category.name = name;
    category.tag = tag;

    const result = await dataSource.getRepository(Category).save(category);

    return result;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const category = await dataSource
      .getRepository(Category)
      .findOne({ where: { id }, relations: ["tag"] });

    if (!category) {
      return false;
    } else {
      const tag = await dataSource
        .getRepository(Tag)
        .find({ where: { id: category.tag.id } });
      dataSource.getRepository(Category).remove(category);
      dataSource.getRepository(Tag).remove(tag);
      return true;
    }
  }
}
