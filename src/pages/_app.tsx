import { AppProps } from "next/app";
import React from "react";
import { Header } from "../components/Header";
import "../styles/globals.scss";

import { Provider as NextAuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
