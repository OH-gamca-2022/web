import { Arg, Resolver } from "type-graphql";
import { Query, Mutation } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Category } from "../entities/Category";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    const dataSource = await getDataSource();
    const result = await dataSource
      .getRepository(Category)
      .find({ relations: { disciplines: true } });

    console.log(result);
    return result;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("name") name: string) {
    const dataSource = await getDataSource();
    const result = await dataSource
      .getRepository(Category)
      .create({ name })
      .save();
    return result;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const category = await dataSource
      .getRepository(Category)
      .find({ where: { id } });
    if (!category) {
      return false;
    } else {
      dataSource.getRepository(Category).remove(category);
      return true;
    }
  }
}
