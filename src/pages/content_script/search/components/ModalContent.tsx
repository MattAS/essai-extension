import { Box, Input, Typography } from "@mui/material";
import { BookOpen } from "lucide-react";
import React, { useEffect } from "react";
import SuggestedWord from "../../../../components/SuggestedWord";
import { suggested } from "../../../../mockData";
import axios from "axios";
import { writeQuestionCache, writeSummaryCache } from "../../../../utils/cache";
import LoadingText from "../../../../components/loading/LoadingText";

interface IModalContentProps {
  inputValue: string;
}

const ModalContent: React.FC<IModalContentProps> = ({ inputValue }) => {
  const [openedIdx, setOpenedIdx] = React.useState<number | null>(null);
  const [input, setInput] = React.useState<string>(inputValue);
  const [suggested, setSuggested] = React.useState<any>();
  const [loading, setIsLoading] = React.useState<boolean>(false);

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      const res = axios.post(
        "https://essai-go-api-le4jqewulq-ue.a.run.app/api/keyword/by/question",
        {
          question: input,
        }
      );
      res.then((res) => {
        const suggestion = res.data.result.map((keywords: any) => {
          return {
            keyword: keywords.keyword,
            papers: [],
            definition: keywords.definition,
          };
        });
        setSuggested(suggestion);
        setIsLoading(false);
        const keywords = res.data.result.map((keywords: any) => {
          return keywords.keyword;
        });
        const paperRes = axios.post(
          "https://essai-go-api-le4jqewulq-ue.a.run.app/api/paper/by/keyword/batch",
          {
            keywords: keywords,
            searchForMoreKeywords: false,
          }
        );

        paperRes.then((paperRes) => {
          console.log(paperRes.data);
          writeQuestionCache({
            question: input,
            keywords: res.data.keywords,
            papers: paperRes.data,
          });
          const newSuggestion = suggestion.map(
            (suggestion: any, idx: number) => {
              return {
                ...suggestion,
                papers: paperRes.data[idx].papers,
              };
            }
          );
          setSuggested(newSuggestion);
        });
      });
    }
  };

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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onEnter}
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
        {loading && <LoadingText />}
        {!loading &&
          suggested &&
          suggested.map((suggestion: any, index: number) => (
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
