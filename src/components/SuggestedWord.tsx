import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { Globe, Maximize2, Minimize2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { readCache } from "../utils/cache";
import LoadingArticles from "./loading/LoadingArticles";
import LoadingText from "./loading/LoadingText";
import QueryLinks from "./QueryLinks";
import RelatedArticles from "./RelatedArticles";

interface ISuggestedWordProps {
  word: string;
  definition: string;
  field: string;
  opened: boolean;
  setOpened: () => void;
}

const SuggestedWord: React.FC<ISuggestedWordProps> = ({
  word,
  definition,
  field,
  opened,
  setOpened,
}) => {
  const [openArticles, setOpenArticles] = useState(false);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [papers, setPapers] = useState<any[]>([]);

  useEffect(() => {
    const getCache = async () => {
      const cache = await readCache("nobel-history");
      if (cache["nobel-history"] && cache["nobel-history"]["searchQueries"]) {
        setSearchQueries(cache["nobel-history"]["searchQueries"]);
      }
    };
    getCache();
  }, []);

  useEffect(() => {
    if (!opened) {
      setOpenArticles(false);
    }
  }, [opened]);

  useEffect(() => {
    if (openArticles) {
      if (searchQueries.length === 0) {
        axios
          .post(process.env.API_ROUTE + "/keyword/queries", {
            keyword: word,
          })
          .then((res) => {
            const queries = res.data.result.map((result: any) => {
              return result.queries
                .split("?")
                .map((query: string) => {
                  if (query !== "") {
                    if (query[0] === ",") {
                      query = query.substring(1, query.length);
                    }
                    return query.trim() + "?";
                  }
                })
                .filter((query: string) => query !== undefined);
            });
            setSearchQueries(queries);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (papers.length === 0) {
        axios
          .post(process.env.API_ROUTE + "/paper/by/keyword/batch", {
            keywords: [word],
            field: field,
          })
          .then((res) => {
            setPapers(res.data[0].papers);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [openArticles]);

  const handleOpenArticles = () => {
    setOpened();
    setOpenArticles(!openArticles);
  };

  const handleGoogleSearch = (searchWord: string) => {
    window.open(`https://www.google.com/search?q=${searchWord}`, "_blank");
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
          alignItems: "center",
          gap: opened && openArticles ? 5 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflow: "hidden",
            flexDirection: "row",
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
          {!openArticles && (
            <Typography
              noWrap
              sx={{
                "&:first-letter": {
                  textTransform: "uppercase",
                },
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                flexGrow: 1,
                color: "white",
                width: "100%",
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
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => handleGoogleSearch(word)}>
              <Globe size={20} color="white" />
            </IconButton>
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
            width: "100%",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              "&:first-letter": {
                textTransform: "uppercase",
              },
              flexGrow: 1,
              color: "white",
              width: "100%",
            }}
          >
            {definition}
          </Typography>
        </Box>
      )}
      {opened && openArticles && (
        <>
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
                width: "100%",
              }}
            >
              {papers.length === 0 ? (
                <LoadingArticles numArticles={2} />
              ) : (
                papers.map((link: any, index: number) => {
                  return (
                    <RelatedArticles paper={link} key={`article-${index}`} />
                  );
                })
              )}
            </Box>
          </Box>
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
              related search queries
            </Typography>
            <Box
              flexWrap={"wrap"}
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {searchQueries.length === 0 ? (
                <LoadingArticles numArticles={4} />
              ) : (
                searchQueries.map((query: string, index: number) => (
                  <QueryLinks query={query} key={`query-${index}`} />
                ))
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
export default SuggestedWord;
