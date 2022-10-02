import { NextApiRequest, NextApiResponse } from "next";

export interface MyContext {
  req: NextApiRequest;
  res: NextApiResponse;
  payload?: { userId: string; role?: string; userClass: string };
}
