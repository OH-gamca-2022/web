import { google } from "googleapis";
import { Arg, Resolver, UseMiddleware } from "type-graphql";
import { Query, Mutation } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { requirePersmission } from "../middleware/requirePermission";
import { ROLES } from "../types/roles";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    const dataSource = await getDataSource();
    // await dataSource.getRepository(Category).delete({});
    const result = await dataSource
      .getRepository(Category)
      .find({ relations: { disciplines: true, tag: true } });
    return result;
  }

  @Mutation(() => Category)
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
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
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async deleteCategory(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const category = await dataSource
      .getRepository(Category)
      .findOne({ where: { id }, relations: { tag: true, disciplines: true } });

    if (
      !category ||
      (category.disciplines && category.disciplines.length > 0)
    ) {
      return false;
    } else {
      const tag = await dataSource
        .getRepository(Tag)
        .find({ where: { id: category.tag.id } });

      await dataSource.getRepository(Category).remove(category);
      await dataSource.getRepository(Tag).remove(tag);
      return true;
    }
  }

  @Mutation(() => Category)
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async setCategoryCalendar(
    @Arg("categoryId") categoryId: string,
    @Arg("calendarId") calendarId: string
  ) {
    const dataSource = await getDataSource();
    const allCategories = await dataSource
      .getRepository(Category)
      .update({ googleCalendarId: calendarId }, { googleCalendarId: null });
    const category = await dataSource
      .getRepository(Category)
      .findOne({ where: { id: categoryId } });
    if (category) {
      category.googleCalendarId = calendarId;
      await dataSource.getRepository(Category).save(category);
      return category;
    } else {
      throw new Error("Category wasn't found");
    }
  }
}
