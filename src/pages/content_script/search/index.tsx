import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Content from "./Content";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

const root = document.createElement("div");
root.id = "essai-root";

const voiceElement =
  document.querySelector('[aria-label="Search by voice"]') ||
  document
    .getElementsByClassName("dRYYxd")[0]
    .querySelectorAll("[type=button]")[1];

const voice = document.querySelector('[aria-label="Search by voice"]');
voice?.setAttribute("style", "width: unset !important;");

voiceElement.before(root);
const image = document.querySelector('[aria-label="Search by image"]');
image?.setAttribute("style", "width: unset !important;");

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  </React.StrictMode>
);
