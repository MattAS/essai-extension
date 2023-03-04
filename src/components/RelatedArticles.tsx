import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import FaviconIcon from "./FaviconIcon";

const RelatedArticles = ({
  paper,
  clickable = true,
  fullWidth = false,
  iconSize = "40px",
}: any) => {
  //Get domain of link
  const [domain, title, openAccess, url] = useMemo(() => {
    const title = paper.title;
    const openAccess = paper.isOpenAccess;
    if (title === undefined) return ["", "", false, ""];
    if (openAccess) {
      const url = paper.openAccessPdf.url;
      const domain = new URL(url).hostname;
      return [domain, title, openAccess, url];
    } else {
      const url = paper.url;
      const domain = new URL(url).hostname;
      return [domain, title, openAccess, url];
    }
  }, [paper]);

  return (
    <Box
      sx={{
        all: "unset",
        display: "flex",
        flexDirection: "row",
        gap: 1.5,
        alignItems: "center",
        flexGrow: 1,
        width: fullWidth ? "95%" : "43%",
        "&:hover": {
          backgroundColor: clickable ? "rgba(129, 129, 129, 0.28)" : "unset",
          cursor: clickable ? "pointer" : "default",
          textDecoration: "none",
        },
        "&:focus": {
          outline: "none",
        },
        "&:visited": {
          color: "inherit",
        },
        padding: 1.5,
        borderRadius: 2,
      }}
      component={clickable ? "a" : "div"}
      href={url}
      target="_blank"
    >
      <FaviconIcon domain={domain} openAccess={true} iconSize={iconSize} />
      <Typography
        textOverflow={"ellipsis"}
        sx={{
          WebkitLineClamp: fullWidth ? 1 : 2,
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          display: "-webkit-box",
          color: "#9D9D9D",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default RelatedArticles;
