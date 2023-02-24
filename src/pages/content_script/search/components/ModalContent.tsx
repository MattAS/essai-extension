import { Box, Input, Typography } from "@mui/material";
import React from "react";
import SuggestedWord from "../../../../components/SuggestedWord";
import axios from "axios";
import { writeQuestionCache } from "../../../../utils/cache";
import LoadingText from "../../../../components/loading/LoadingText";
import * as emptyModalAnimation from "../../../../assets/emptyModal.json";
import Lottie from "lottie-react";
import EnhancedSearch from "../../../../components/Icons/EnhancedSearch";

interface IModalContentProps {
  inputValue: string;
}

const ModalContent: React.FC<IModalContentProps> = ({ inputValue }) => {
  const [openedIdx, setOpenedIdx] = React.useState<number | null>(null);
  const [input, setInput] = React.useState<string>(inputValue);
  const [suggested, setSuggested] = React.useState<any>();
  const [loading, setIsLoading] = React.useState<boolean>(false);

  const onEnter = (e: React.KeyboardEvent) => {
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
      writeQuestionCache(newSuggestion);
    };
    if (e.key === "Enter") {
      setIsLoading(true);
      getContent();
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
            paddingX: 1,
            fontSize: 14,
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
            gap: 1,
          }}
          startAdornment={<EnhancedSearch color="white" size={25} />}
          placeholder="Type your question or topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onEnter}
        />
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
        {loading && <LoadingText />}
        {!loading && suggested && (
          <>
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
          </>
        )}
        {!suggested && !loading && (
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
              }}
            >
              Begin your guided research journey!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModalContent;
