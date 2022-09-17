import { getSession } from "next-auth/react";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import { ROLES, ROLE_LEVELS } from "../types/roles";
import { hasPermission } from "../utils/hasPermission";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export function requirePersmission(required: ROLES): MiddlewareFn<MyContext> {
  return async ({ context }, next) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
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
