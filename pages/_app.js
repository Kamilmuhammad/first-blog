import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import { SessionProvider } from "next-auth/react";
import { client } from "../lib/apollo";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <ApolloProvider client={client}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ApolloProvider>
    );
}

export default MyApp;
