import React, { ComponentType, Fragment, ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme, { createEmotionCache } from "public/material";
import store from "redux-store";
import MainLayout from "layouts/MainLayout";
import "language";
import "public/styles/index.scss";
import { AuthProvider, GlobalModalProvider } from "context";
import { NextPage } from "next";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: Element) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalModalProvider>
            <AuthProvider>
              <CssBaseline />
              <MainLayout {...pageProps}>
                {getLayout(<Component {...pageProps} />)}
              </MainLayout>
            </AuthProvider>
          </GlobalModalProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

type MyAppProps = AppProps & {
  Component: Element & { getLayout: CallableFunction; layout?: ComponentType };
  emotionCache: EmotionCache;
  pageProps: Record<string, unknown>;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default MyApp;
