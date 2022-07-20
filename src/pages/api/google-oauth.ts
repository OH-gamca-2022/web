import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ROLES } from "../../types/roles";
import { generateURL } from "../../utils/google-signin";
import { hasPermission } from "../../utils/hasPermission";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession();
  if (!hasPermission(session?.user.role as ROLES, ROLES.EDITOR)) {
    res.send("You do not have permission for this action");
  }
  res.redirect(generateURL());
}
