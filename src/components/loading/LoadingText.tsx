import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

const LoadingText = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", paddingX: 2 }}>
      {
        // Map over the array of 10 items to render 10 skeletons with variant text
        Array.from(Array(10).keys()).map((i) => (
          <Skeleton
            key={`Text-${i}`}
            variant="text"
            animation="wave"
            sx={{
              fontSize: "2rem",
              backgroundColor: "rgba(255, 255, 255, 0.11)",
            }}
          />
        ))
      }
    </Box>
  );
};

export default LoadingText;
