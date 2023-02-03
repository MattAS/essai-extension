import { Box, Input, Typography } from "@mui/material";
import { BookOpen } from "lucide-react";
import React from "react";
import SuggestedWord from "./SuggestedWord";
import { suggested } from "../mockData";

interface IModalContentProps {
  inputValue: string;
}

const ModalContent: React.FC<IModalContentProps> = ({ inputValue }) => {
  const [openedIdx, setOpenedIdx] = React.useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setOpenedIdx(idx);
  };

  return (
    <Box
      sx={{
        width: "50vw",
        height: "60vh",
        backgroundColor: "#080A29",
        position: "absolute",
        top: "20%",
        left: "25%",
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
        boxShadow: "0px 0px 4px rgba(125, 125, 125, 0.75)",
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
        <Input
          sx={{
            all: "unset",
            color: "white",
            padding: 0,
            fontSize: 14,
            "&:focus": {
              outline: "none",
            },
            "&:after": {
              borderBottom: 0,
            },
            width: "100%",
          }}
          placeholder="Search for a keyword"
          value={inputValue}
        />
        <BookOpen color="white" size={24} />
      </Box>
      <Box
        sx={{
          width: "95%",
          gap: 4,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
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
        {suggested.map((suggestion, index) => (
          <SuggestedWord
            key={index}
            opened={openedIdx === index}
            setOpened={() => handleOpen(index)}
            word={suggestion.keyword}
            definition={suggestion.definition}
            links={suggestion.papers}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ModalContent;
