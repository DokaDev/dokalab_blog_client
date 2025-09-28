import { HttpLink } from "@apollo/client";
import {
    ApolloClient,
    InMemoryCache,
    registerApolloClient,
} from "@apollo/client-integration-nextjs";

// Blog API Client
export const { getClient: getBlogClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri:
                process.env.BLOG_API_BASE_URL ||
                "http://localhost:4000/graphql",
        }),
    });
});

// Auth API Client
export const { getClient: getAuthClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri:
                process.env.AUTH_API_BASE_URL ||
                "http://localhost:3000/graphql",
        }),
    });
});
