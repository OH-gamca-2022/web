import { NextApiRequest, NextApiResponse } from "next";
import { oauth2Client, saveRefreshToken } from "../../utils/google-signin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code as string;
  const { tokens } = await oauth2Client.getToken(code);
  console.log(tokens);
  if (tokens.refresh_token) {
    saveRefreshToken(tokens.refresh_token);
  }
  res.redirect("/");
}
