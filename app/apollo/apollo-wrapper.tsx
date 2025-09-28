'use client';

import { HttpLink } from "@apollo/client";
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from "@apollo/client-integration-nextjs";
import { ChildrenType } from "../common/type/children";

function makeClient() {
    const httpLink = new HttpLink({
        uri: process.env.BLOG_API_BASE_URL || "http://localhost:4000/graphql",
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloWrapper(
    { children }: ChildrenType
) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}