import { Typography, Box } from "@mui/material";
import { Globe } from "lucide-react";
import React from "react";

interface IQueryLinksProps {
  query: string;
}

const QueryLinks: React.FC<IQueryLinksProps> = ({ query }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#151634",
        },
        width: "45%",
        padding: 2,
        paddingY: 2,
        borderRadius: 3,
        justifyContent: "center",
      }}
      onClick={() => {
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
      }}
    >
      <Globe color="#9D9D9D" size={20} />
      <Box
        sx={{
          width: "95%",
          flexWrap: "wrap",
          display: "flex",
          hyphens: "auto",
        }}
      >
        <Typography
          sx={{
            color: "#9D9D9D",
            webkitLineClamp: 3,
            display: "-webkit-box",
            webkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            hyphens: "auto",
            textDecoration: "underline",
          }}
        >
          {query}
        </Typography>
      </Box>
    </Box>
  );
};

export default QueryLinks;
