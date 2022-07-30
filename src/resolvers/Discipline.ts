import { Arg, Resolver } from "type-graphql";
import { Query, Mutation } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Discipline } from "../entities/Discipline";
import { Tag } from "../entities/Tag";

@Resolver()
export class DisciplineResolver {
  @Query(() => [Discipline])
  async getDisciplines() {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(Discipline)
      .find({ relations: { category: true, tag: true } });
  }

  @Mutation(() => Discipline)
  async createDiscipline(
    @Arg("name") name: string,
    @Arg("categoryId") categoryId: string
  ) {
    const dataSource = await getDataSource();

    const tag = await dataSource.getRepository(Tag).create({ name }).save();

    const discipline = new Discipline();
    discipline.name = name;
    discipline.categoryId = categoryId;
    discipline.tag = tag;

    const result = await dataSource.getRepository(Discipline).save(discipline);

    return result;
  }

  @Mutation(() => Boolean)
  async deleteDiscipline(@Arg("id") id: string) {
    console.log(id);
    const dataSource = await getDataSource();
    const discipline = await dataSource
      .getRepository(Discipline)
      .findOne({ where: { id }, relations: { tag: true } });
    console.log(discipline);
    if (!discipline) {
      return false;
    } else {
      const tag = await dataSource
        .getRepository(Tag)
        .find({ where: { id: discipline.tag.id } });
      await dataSource.getRepository(Tag).remove(tag);
      await dataSource.getRepository(Discipline).remove(discipline);
      return true;
    }
  }

  @Mutation(() => Discipline)
  async editDiscipline(@Arg("name") name: string, @Arg("id") id: string) {
    const dataSource = await getDataSource();
    const discipline = await dataSource
      .getRepository(Discipline)
      .findOne({ where: { id }, relations: { tag: true } });
    if (discipline) {
      const tag = await dataSource
        .getRepository(Tag)
        .findOne({ where: { id: discipline.tag.id } });
      discipline.name = name;
      if (tag) {
        tag.name = name;
      } else {
        throw new Error("An error occured");
      }
      await dataSource.getRepository(Tag).save(tag);
      await dataSource.getRepository(Discipline).save(discipline);
      return discipline;
    } else {
      throw new Error("Discipline wasn't found");
    }
  }
}
