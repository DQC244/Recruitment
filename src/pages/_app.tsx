import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme, { createEmotionCache } from "public/material";
import store from "redux-store";
import MainLayout from "layouts/MainLayout";
import "language";
import "public/styles/index.scss";

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
          <CssBaseline />
          <MainLayout {...pageProps}>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

type MyAppProps = AppProps & {
  Component: Element & { getLayout: CallableFunction };
  emotionCache: EmotionCache;
  pageProps: Record<string, unknown>;
};

export default MyApp;
