import { Box, IconButton, Input, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SuggestedWord from "../../../../components/SuggestedWord";
import axios from "axios";
import LoadingText from "../../../../components/loading/LoadingText";
import * as emptyModalAnimation from "../../../../assets/emptyModal.json";
import Lottie from "lottie-react";
import EnhancedSearch from "../../../../components/Icons/EnhancedSearch";
import { readCache, writeToCache } from "../../../../utils/cache";
import History from "./History";
import { ArrowRight, BookOpen } from "lucide-react";

interface IModalContentProps {
  inputValue: string;
}

const ModalContent: React.FC<IModalContentProps> = ({ inputValue }) => {
  const [openedIdx, setOpenedIdx] = React.useState<number | null>(null);
  const [input, setInput] = React.useState<string>(inputValue);
  const [suggested, setSuggested] = React.useState<any>();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [history, setHistory] = React.useState<any>([]);

  useEffect(() => {
    const getCache = async () => {
      const cache = await readCache("nobel-history");
      if (cache["nobel-history"]) {
        setHistory(Object.values(cache["nobel-history"]));
      }
    };
    getCache();
  }, []);

  const getContent = async () => {
    const res = await axios.post(
      "https://essai-go-api-le4jqewulq-ue.a.run.app/api/keyword/by/question",
      {
        question: input,
      }
    );
    const suggestion = await res.data.result.map((keywords: any) => {
      return {
        keyword: keywords.keyword,
        papers: [],
        definition: keywords.definition,
        searchQueries: [],
      };
    });
    setSuggested(suggestion);
    setIsLoading(false);
    const keywords = res.data.result.map((keywords: any) => {
      return keywords.keyword;
    });
    const paperRes = await axios.post(
      "https://essai-go-api-le4jqewulq-ue.a.run.app/api/paper/by/keyword/batch",
      {
        keywords: keywords,
        searchForMoreKeywords: false,
      }
    );
    const newSuggestion = suggestion.map((suggestion: any, idx: number) => {
      return {
        ...suggestion,
        papers: paperRes.data[idx].papers,
      };
    });
    setSuggested(newSuggestion);
    writeToCache("nobel-question", newSuggestion);
    const toCache = {
      question: input,
      response: newSuggestion,
    };
    writeToCache("nobel-history", [toCache, ...history]);
    setHistory([toCache, ...history]);
  };

  const fulfillRequest = () => {
    if (input.trim() !== "") {
      setIsLoading(true);

      //Find the question in the history
      const found = history.find(
        (item: any) =>
          item.question.trim().toLowerCase() === input.trim().toLowerCase()
      );
      if (found) {
        setSuggested(found.response);

        // Bump the question to the top of the history
        const newHistory = history.filter(
          (item: any) => item.question !== input
        );
        setHistory([found, ...newHistory]);
        writeToCache("nobel-history", [found, ...newHistory]);

        setIsLoading(false);
        return;
      } else {
        getContent();
      }
    }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim() !== "") {
      fulfillRequest();
    }
  };

  const handleOpen = (idx: number) => {
    setOpenedIdx(idx);
  };

  const setSuggestion = (suggestion: any, question: string) => {
    setSuggested(suggestion);
    setInput(question);
  };

  console.log();

  return (
    <Box
      sx={{
        width: "50vw",
        height: "60vh",
        backgroundColor: "#080A29",
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
            paddingX: 1,
            fontSize: 14,
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            "&:focus": {
              outline: "none",
            },
            "&:after": {
              borderBottom: 0,
            },
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            "::placeholder": {
              color: "#9295BE",
            },
          }}
          startAdornment={<EnhancedSearch color="white" size={25} />}
          endAdornment={
            <IconButton onClick={fulfillRequest}>
              <ArrowRight
                color={input.trim() === "" ? "#8386B7" : "white"}
                size={25}
                cursor={input.trim() === "" ? "default" : "pointer"}
              />
            </IconButton>
          }
          placeholder="Type your question or topic to enhance"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onEnter}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          gap: 4,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loading && <LoadingText />}
        {!loading && suggested && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingX: 2,
              gap: 4,
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
            {suggested.map((suggestion: any, index: number) => (
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
        )}
        {!suggested && !loading && Object.values(history).length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginLeft: 2,
              }}
            >
              <BookOpen fill="white" size={28} color="#080A29" />
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                History
              </Typography>
            </Box>
            <Box
              sx={{
                overflow: "scroll",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {history.map((hist: any, index: number) => {
                return (
                  <History
                    key={`history-${index}`}
                    question={hist.question}
                    onClick={() => setSuggestion(hist.response, hist.question)}
                  />
                );
              })}
            </Box>
          </Box>
        ) : !suggested && !loading && history.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Lottie
              /* @ts-expect-error */
              animationData={emptyModalAnimation.default}
              loop={true}
              style={{ width: "65%", height: "65%" }}
            />
            <Typography
              sx={{
                fontSize: 20,
                color: "white",
              }}
            >
              Begin your guided research journey!
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default ModalContent;
