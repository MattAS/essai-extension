import { Box, Fade, IconButton, Typography } from "@mui/material";
import { Maximize2, X } from "lucide-react";
import React, { useState } from "react";
import RelatedArticles from "./RelatedArticles";

interface ISuggestedWordProps {
  word: string;
  definition: string;
}

const SuggestedWord: React.FC<ISuggestedWordProps> = ({ word, definition }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
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
            overflow: "hidden",
          }}
        >
          <Typography
            whiteSpace={"nowrap"}
            sx={{
              fontWeight: "bold",
              color: "white",
              "&:first-letter": {
                textTransform: "uppercase",
              },
            }}
          >
            {word}
          </Typography>
          {!open && (
            <Typography
              noWrap
              sx={{
                color: "white",
                "&:first-letter": {
                  textTransform: "uppercase",
                },
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                flexGrow: 1,
              }}
            >
              {definition}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleClick}>
            <Maximize2 size={20} color="white" />
          </IconButton>
          <X size={24} color="white" />
        </Box>
      </Box>
      {open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Typography sx={{ textTransform: "capitalize", color: "white" }}>
            {definition}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              related articles and papers
            </Typography>
            <Box
              flexWrap={"wrap"}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <RelatedArticles />
              <RelatedArticles />
              <RelatedArticles />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default SuggestedWord;
