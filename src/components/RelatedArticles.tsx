import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import FaviconIcon from "./FaviconIcon";

const RelatedArticles = ({ paper }: any) => {
  //Get domain of link
  const [domain, title, openAccess, url] = useMemo(() => {
    const title = paper.title;
    const openAccess = paper.isOpenAccess;
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
        gap: 2,
        alignItems: "center",
        width: "40%",
        "&:hover": {
          backgroundColor: "rgba(129, 129, 129, 0.28)",
          cursor: "pointer",
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
      component="a"
      href={url}
      target="_blank"
    >
      <FaviconIcon domain={domain} openAccess={openAccess} />
      <Typography
        textOverflow={"ellipsis"}
        sx={{
          WebkitLineClamp: 2,
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          display: "-webkit-box",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default RelatedArticles;
