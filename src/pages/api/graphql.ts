import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../../resolvers/User";
import { PostResolver } from "../../resolvers/Post";
import { TagResolver } from "../../resolvers/Tag";
import { DisciplineResolver } from "../../resolvers/Discipline";
import { CategoryResolver } from "../../resolvers/Category";
import { EventResolver } from "../../resolvers/Event";

const cors = Cors();

let server: ApolloServer | null;

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  if (!server) {
    server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [
          UserResolver,
          PostResolver,
          TagResolver,
          DisciplineResolver,
          CategoryResolver,
          EventResolver,
        ],
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    await server.start();
  }

  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
