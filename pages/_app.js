import { useCallback, useEffect } from "react";
import Head from "next/head";

// jss
import { create } from "jss";
import rtl from "jss-rtl";

// MUI & StyledComponent Core
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "Utils/theme";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
// Ant design
import { ConfigProvider } from "antd";
// import "moment/locale/fa";
import fa_IR from "antd/lib/locale/fa_IR";
import "antd/dist/antd.css";

// carousel styles
import "Assets/libs/react-alice-carousel/react-alice-carousel.css";

// react-gallery
import "react-image-gallery/styles/scss/image-gallery.scss";

// STYLES
import CssBaseline from "@material-ui/core/CssBaseline";
import { Normalize } from "styled-normalize";
import "Assets/styles/index.scss";

// Redux
import { ReduxWrapper } from "ReduxWrapper";

// Layout
import Layout from "Components/Layout";

// Modal (reoverlay)
import ModalConfig from "Components/Modal/ModalConfig";
import { RouteGuard } from "RouteGard";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

function MyApp({ Component, pageProps, menu, ...appProps }) {
  // useEffect config material-ui
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          reg => console.log("serviceWorker registered"),
          err => console.log("err in registering serviceworker", err),
        );
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F6891F" />
        <title>راهساز ماشین</title>
      </Head>
      <ReduxWrapper>
        <ConfigProvider direction="rtl" locale={fa_IR}>
          <StyledThemeProvider theme={theme}>
            <StylesProvider jss={jss} generateClassName={generateClassName}>
              <MaterialThemeProvider theme={theme}>
                <CssBaseline />
                <Normalize />
                {/* <UserProvider> */}
                <RouteGuard>
                  <Layout>
                    <Component {...pageProps} />
                    <ModalConfig />
                  </Layout>
                </RouteGuard>
                {/* </UserProvider> */}
              </MaterialThemeProvider>
            </StylesProvider>
          </StyledThemeProvider>
        </ConfigProvider >
      </ReduxWrapper >
    </>
  );
}

export default MyApp;
