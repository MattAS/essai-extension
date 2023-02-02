import { Box, Typography } from "@mui/material";
import { Maximize2, X } from "lucide-react";
import React from "react";

interface ISuggestedWordProps {
  word: string;
  definition: string;
}

const SuggestedWord: React.FC<ISuggestedWordProps> = ({ word, definition }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "white",
          }}
        >
          {word}
        </Typography>
        <Typography sx={{ textTransform: "capitalize", color: "white" }}>
          {definition}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Maximize2 size={20} color="white" />
        <X size={24} color="white" />
      </Box>
    </Box>
  );
};
export default SuggestedWord;
