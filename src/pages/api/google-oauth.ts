import { NextApiRequest, NextApiResponse } from "next";
import { generateURL } from "../../utils/google-signin";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(generateURL());
}
