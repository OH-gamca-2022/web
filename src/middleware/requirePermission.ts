import { getSession } from "next-auth/react";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import { ROLES, ROLE_LEVELS } from "../types/roles";
import { hasPermission } from "../utils/hasPermission";

export function requirePersmission(required: ROLES): MiddlewareFn<MyContext> {
  return async ({ context }, next) => {
    const session = await getSession({ req: context.req });
    console.log("session", session);
    if (!session) {
      throw new Error("not authenticated");
    }

    const role = session.user.role as ROLES;

    if (!hasPermission(session.user.role as ROLES, required)) {
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
