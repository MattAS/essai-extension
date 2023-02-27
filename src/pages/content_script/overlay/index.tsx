import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Content from "./Content";
import { ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import "@fontsource/inter/variable.css";

const container = document.createElement("div");
container.id = "nobel-host";
document.body.append(container);

const emotionRoot = document.createElement("style");

const root = document.createElement("div");
root.id = "nobel-overlay-root";

// Create shadow root
const shadowRootContainer = container.attachShadow({ mode: "open" });
shadowRootContainer.appendChild(emotionRoot);
shadowRootContainer.appendChild(root);

let sheet = new CSSStyleSheet();
sheet.replaceSync(`
  #nobel-overlay-root {
    position: fixed;
    top: 2%;
    right: 1.5%;
    z-index: 2147483647;
    gap: 10px;
    display: flex;
    flex-direction: row-reverse;
    width: 1px;
    height: 1px;
  }
`);

shadowRootContainer.adoptedStyleSheets = [sheet];

const theme = createTheme({
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: "left",
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: "#080A29",
          marginRight: "25px!important",
          marginLeft: "25px!important",
          fontSize: "14px",
          fontFamily: "Inter, sans-serif",
          borderRadius: "8px",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "15px",
          paddingRight: "15px",
          maxWidth: "none",
          whiteSpace: "nowrap",
        },
        arrow: {
          color: "#080A29",
        },
      },
    },
    MuiModal: {
      defaultProps: {
        disablePortal: true,
      },
      styleOverrides: {
        root: {
          width: "fit-content",
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        disablePortal: true,
      },
      styleOverrides: {
        root: {
          maxWidth: "none",
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        disablePortal: true,
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const stylesCache = createCache({
  key: "nobel-mui-styles",
  prepend: true,
  container: emotionRoot,
});

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider value={stylesCache}>
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
