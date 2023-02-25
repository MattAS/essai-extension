import { Typography, Box } from "@mui/material";
import { ArrowRight } from "lucide-react";
import React from "react";

interface IHistoryProps {
  question: string;
  onClick: () => void;
}

const History: React.FC<IHistoryProps> = ({ question, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        },
        padding: 2,
        borderRadius: 2,
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          color: "white",
        }}
      >
        {question}
      </Typography>
      <ArrowRight color="white" size={24} />
    </Box>
  );
};

export default History;
