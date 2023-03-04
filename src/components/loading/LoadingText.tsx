import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

interface ILoadingTextProps {
  numLines?: number;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline"
    | "inherit"
    | undefined;
}

const LoadingText: React.FC<ILoadingTextProps> = ({
  numLines = 10,
  variant = "h2",
}) => {
  // Define font sizes for each variant
  const fontSizes: { [key: string]: string } = {
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.75rem",
    h4: "1.5rem",
    h5: "1.25rem",
    h6: "1rem",
    subtitle1: "1rem",
    subtitle2: "0.875rem",
    body1: "1rem",
    body2: "0.875rem",
    caption: "0.75rem",
    overline: "0.75rem",
  };

  // Make a function that searches the fontSizes object for the fontSize prop
  const getFontSize = (fontSize: string) => {
    for (const key in fontSizes) {
      if (key === fontSize) {
        return fontSizes[key];
      }
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%", paddingX: 2 }}>
      {
        // Map over the array of 10 items to render 10 skeletons with variant text
        Array.from(Array(numLines).keys()).map((i) => (
          <Skeleton
            key={`Text-${i}`}
            variant="text"
            animation="wave"
            sx={{
              fontSize: getFontSize(variant),
              backgroundColor: "rgba(255, 255, 255, 0.11)",
            }}
          />
        ))
      }
    </Box>
  );
};

export default LoadingText;
