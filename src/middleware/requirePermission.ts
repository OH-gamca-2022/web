import { getSession } from "next-auth/react";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import { ROLES, ROLE_LEVELS } from "../types/roles";

export function requirePersmission(required: ROLES): MiddlewareFn<MyContext> {
  return async ({ context }, next) => {
    const session = await getSession({ req: context.req });
    console.log("session", session);
    if (!session) {
      throw new Error("not authenticated");
    }

    const role = session.user.role as ROLES;

    if (ROLE_LEVELS[role] < ROLE_LEVELS[required]) {
      throw new Error("you don't have permission for this action");
    }

    const userId = session.user.id;

    context.payload = {
      userId,
      role,
    };

    return next();
  };
}
