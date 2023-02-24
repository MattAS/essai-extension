import { Box, IconButton, Typography } from "@mui/material";
import { Maximize2, Minimize2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoadingArticles from "./loading/LoadingArticles";
import RelatedArticles from "./RelatedArticles";

interface ISuggestedWordProps {
  word: string;
  definition: string;
  links: {
    url: string;
    title: string;
  }[];
  opened: boolean;
  setOpened: () => void;
}

const SuggestedWord: React.FC<ISuggestedWordProps> = ({
  word,
  definition,
  links,
  opened,
  setOpened,
}) => {
  const [openArticles, setOpenArticles] = useState(false);

  useEffect(() => {
    if (!opened) {
      setOpenArticles(false);
    }
  }, [opened]);

  const handleOpenArticles = () => {
    setOpened();
    setOpenArticles(!openArticles);
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
          gap: opened && openArticles ? 5 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflow: "hidden",
            flexDirection: !opened || !openArticles ? "row" : "column",
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
          <Typography
            noWrap
            sx={{
              "&:first-letter": {
                textTransform: "uppercase",
              },
              whiteSpace: !openArticles ? "nowrap" : "normal",
              textOverflow: "ellipsis",
              flexGrow: 1,
            }}
          >
            {definition}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={handleOpenArticles}>
              {!openArticles ? (
                <Maximize2 size={20} color="white" />
              ) : (
                <Minimize2 size={20} color="white" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
      {opened && openArticles && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 5,
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
              justifyContent: "space-between",
            }}
          >
            {links.length === 0 ? (
              <LoadingArticles />
            ) : (
              links.map((link) => <RelatedArticles paper={link} />)
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default SuggestedWord;
