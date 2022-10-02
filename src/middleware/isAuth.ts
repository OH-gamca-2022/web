import { getSession } from "next-auth/react";
import { MiddlewareFn } from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { User } from "../entities/User";
import { MyContext } from "../types/MyContext";

const dataSource = getDataSource();

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    throw new Error("not authenticated");
  }

  try {
    const userId = session.user.id;
    const userClass = session.user.class;
    context.payload = {
      userId,
      userClass,
    };
  } catch (err) {
    throw new Error("not authenticated");
  }

  return next();
};
