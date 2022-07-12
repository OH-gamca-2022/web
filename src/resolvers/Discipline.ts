import { Arg, Resolver } from "type-graphql";
import { Query, Mutation } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Discipline } from "../entities/Discipline";

@Resolver()
export class DisciplineResolver {
  @Query(() => [Discipline])
  async getDisciplines() {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(Discipline)
      .find({ relations: { category: true } });
  }

  @Mutation(() => Discipline)
  async createDiscipline(
    @Arg("name") name: string,
    @Arg("categoryId") categoryId: string
  ) {
    const dataSource = await getDataSource();
    const result = await dataSource
      .getRepository(Discipline)
      .create({ categoryId, name })
      .save();
    return result;
  }

  @Mutation(() => Boolean)
  async deleteDiscipline(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const discipline = await dataSource
      .getRepository(Discipline)
      .find({ where: { id } });
    if (!discipline) {
      return false;
    } else {
      dataSource.getRepository(Discipline).remove(discipline);
      return true;
    }
  }
}
