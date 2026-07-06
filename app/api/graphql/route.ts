import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";

import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";

const server = new ApolloServer({ typeDefs, resolvers });

const rawHandler = startServerAndCreateNextHandler(server);
const handler = (request: NextRequest) => rawHandler(request);

export { handler as GET, handler as POST };
