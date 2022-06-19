import { getSession } from "next-auth/react";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const session = getSession({ req: context.req });
  if (!session) {
    throw new Error("not authenticated");
  }

  try {
  } catch (err) {
    throw new Error("not authenticated");
  }

  return next();
};
