import { Box, Fade, IconButton, Typography } from "@mui/material";
import { Globe, Maximize2, Minimize2, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { moreSearchResults } from "../mockData";
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
  const [openSearch, setOpenSearch] = useState(false);

  const searchQueries = moreSearchResults.filter(
    (result) => result.keyword === word
  );

  useEffect(() => {
    if (!opened) {
      setOpenArticles(false);
      setOpenSearch(false);
    }
  }, [opened]);

  const handleOpenArticles = () => {
    setOpened();
    setOpenArticles(!openArticles);
    setOpenSearch(false);
  };

  console.log("opened", opened, openArticles, openSearch);

  const handleOpenSearch = () => {
    setOpened();
    setOpenSearch(!openSearch);
    setOpenArticles(false);
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
          gap: opened && (openArticles || openSearch) ? 5 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflow: "hidden",
            flexDirection:
              !opened || (!openArticles && !openSearch) ? "row" : "column",
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
              whiteSpace: "nowrap",
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
            <IconButton onClick={handleOpenSearch}>
              <Search size={20} color="white" />
            </IconButton>
            <IconButton onClick={handleOpenArticles}>
              {!openArticles ? (
                <Maximize2 size={20} color="white" />
              ) : (
                <Minimize2 size={20} color="white" />
              )}
            </IconButton>
            <X size={24} color="white" />
          </Box>
        </Box>
      </Box>
      {opened && openSearch && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
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
            Enhanced Search Queries
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
            {searchQueries[0].queries.map((query) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography>{query}</Typography>
                <IconButton
                  onClick={() => {
                    window.open(
                      `https://www.google.com/search?q=${query}`,
                      "_blank"
                    );
                  }}
                >
                  <Globe size={20} color="white" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
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
            {links.map((link) => (
              <RelatedArticles paper={link} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default SuggestedWord;
