import { Box, Typography } from "@mui/material";
import React from "react";

const RelatedArticles = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        width: "45%",
        "&:hover": {
          backgroundColor: "rgba(129, 129, 129, 0.28)",
          cursor: "pointer",
        },
        padding: 1.5,
        borderRadius: 2,
      }}
      onClick={() => {
        window.open("https://www.nature.com/articles/nmeth.3317", "_blank");
      }}
    >
      <Box
        sx={{
          width: "40px",
          height: "25px",
          backgroundColor: "rgba(129, 129, 129, 0.20)",
          padding: 2,
          borderRadius: 1,
          backgroundImage:
            "url(https://www.google.com/s2/favicons?domain=www.nature.com&sz=32)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Typography
        sx={{
          color: "white",
        }}
      >
        HISAT: a fast spliced aligner with low memory requirements
      </Typography>
    </Box>
  );
};

export default RelatedArticles;
