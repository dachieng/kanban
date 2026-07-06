"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useState, type ReactNode } from "react";

import { createApolloClient } from "@/lib/apollo-client";

const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(() => createApolloClient());

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
