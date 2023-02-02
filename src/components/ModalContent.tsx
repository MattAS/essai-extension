import { Box, Typography } from "@mui/material";
import { BookOpen } from "lucide-react";
import React from "react";
import SuggestedWord from "./SuggestedWord";

const suggested = [
  {
    word: "reminisce",
    definition: "to recall the past",
  },
  {
    word: "Autobiographical memory",
    definition: "the memory of one’s own life",
  },
  {
    word: "Episodic memory",
    definition: "the memory of specific events",
  },
  {
    word: "Semantic memory",
    definition: "the memory of facts and general knowledge",
  },
  {
    word: "Procedural memory",
    definition: "the memory of how to do things",
  },
];

const ModalContent = () => {
  return (
    <Box
      sx={{
        width: "60vw",
        height: "60vh",
        backgroundColor: "#080A29",
        position: "absolute",
        top: "20%",
        left: "20%",
        display: "flex",
        borderRadius: 4,
        border: "none",
        "&:focus": {
          outline: "none",
        },
        padding: 2,
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box
        sx={{
          width: "96%",
          height: "5%",
          borderRadius: 2,
          backgroundColor: "#181E82",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ color: "white" }}>
          How do people reminisce?
        </Typography>
        <BookOpen color="white" size={24} />
      </Box>
      <Box
        sx={{
          width: "95%",
          gap: 4,
          display: "flex",
          flexDirection: "column",
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
          suggested keywords
        </Typography>
        {suggested.map((suggestion) => (
          <SuggestedWord
            word={suggestion.word}
            definition={suggestion.definition}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ModalContent;
