import dayjs from "dayjs";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Answer } from "../entities/Answer";
import { Cipher } from "../entities/Cipher";
import { isAuth } from "../middleware/isAuth";
import { requirePersmission } from "../middleware/requirePermission";
import { MyContext } from "../types/MyContext";
import { ROLES } from "../types/roles";

@Resolver()
export class CipherResolver {
  @Query(() => Cipher)
  async getCipher(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Cipher).findOne({ where: { id } });
  }

  @Query(() => [Cipher])
  async getCiphers() {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(Cipher)
      .createQueryBuilder("cipher")
      .select()
      .where("cipher.published = :published", { published: true })
      .orderBy("cipher.name")
      .getMany();
  }

  @Query(() => [Cipher])
  async getAllCiphers() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Cipher).find();
  }

  @Mutation(() => Cipher)
  async saveCipher(
    @Arg("name") name: string,
    @Arg("correctAnswer") correctAnswer: string,
    @Arg("published") published: boolean,
    @Arg("fileLink", { nullable: true }) fileLink: string,
    @Arg("id", { nullable: true }) id?: string
  ) {
    const dataSource = await getDataSource();
    let cipher;
    if (id) {
      cipher = await dataSource
        .getRepository(Cipher)
        .findOne({ where: { id } });
    }
    if (!cipher) {
      cipher = await dataSource
        .getRepository(Cipher)
        .create({ name, correctAnswer })
        .save();
    }
    cipher.name = name;
    cipher.correctAnswer = correctAnswer;
    cipher.fileLink = fileLink;
    if (published && !cipher.published) {
      cipher.publishDate = new Date();
    }
    cipher.published = published;
    return dataSource.getRepository(Cipher).save(cipher);
  }

  @Mutation(() => Answer)
  @UseMiddleware(isAuth)
  async answer(
    @Arg("answer") answer: string,
    @Arg("cipherId") cipherId: string,
    @Ctx() { payload }: MyContext
  ) {
    const dataSource = await getDataSource();
    const userClassName = payload?.userClass;
    const answersOfClass = await dataSource.getRepository(Answer).find({
      where: { className: payload?.userClass, cipherId },
      order: { time: "DESC" },
    });
    console.log(answersOfClass);
    if (answersOfClass && answersOfClass.length !== 0) {
      const timeOfLastAnswer = answersOfClass[0].time;
      if (
        dayjs().isBefore(
          dayjs(timeOfLastAnswer).add(15 * answersOfClass.length, "minute")
        )
      ) {
        throw new Error("time limit has not passed yet");
      }
    }

    const cipher = await dataSource
      .getRepository(Cipher)
      .findOne({ where: { id: cipherId } });
    return dataSource
      .getRepository(Answer)
      .create({
        className: userClassName,
        cipherId: cipher?.id,
        answer,
        correct: answer == cipher?.correctAnswer,
        time: new Date(),
      })
      .save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async deleteCipher(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const cipher = await dataSource
      .getRepository(Cipher)
      .findOne({ where: { id } });
    if (cipher) {
      await dataSource.getRepository(Cipher).remove(cipher);
      return true;
    } else {
      return false;
    }
  }

  @Query(() => [Answer])
  @UseMiddleware(isAuth)
  async getAnswersOfMyClass(@Ctx() { payload }: MyContext) {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(Answer)
      .find({ where: { className: payload?.userClass } });
  }

  @Query(() => [Answer])
  @UseMiddleware(requirePersmission(ROLES.EDITOR))
  async getAllAnswers() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Answer).find();
  }
}
