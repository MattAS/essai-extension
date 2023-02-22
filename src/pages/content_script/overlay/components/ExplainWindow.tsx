import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { GripHorizontal, Microscope } from "lucide-react";
import { useEffect, useState } from "react";
import TextQuestion from "../../../../components/Icons/TextQuestion";
import { readSummaryCache, writeSummaryCache } from "../../../../utils/cache";
import LoadingText from "../../../../components/loading/LoadingText";

interface IExplainWindowProps {
  selection: string;
  shouldLoad: boolean;
}

const ExplainWindow: React.FC<IExplainWindowProps> = ({
  selection,
  shouldLoad,
}) => {
  const [summary, setSummary] = useState<string>("");
  const height = window.innerHeight;
  const width = window.innerWidth;

  console.log(shouldLoad);

  useEffect(() => {
    if (shouldLoad) {
      setSummary("");
      chrome.storage.local.get(["essai-summary"], (result) => {
        console.log(result);
        if (result.response && result.selection.trim() === selection.trim()) {
          setSummary(result["essai-summary"].response);
          return;
        } else {
          console.log("IN");
          axios
            .post(
              "https://essai-go-api-le4jqewulq-ue.a.run.app/api/summary/highlight",
              {
                text: selection,
              }
            )
            .then((response) => {
              console.log(response);
              writeSummaryCache({
                response: response.data.summary,
                selection: selection,
              });
              setSummary(response.data.summary);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }, [selection, shouldLoad]);

  return (
    <AnimatePresence>
      <Box
        sx={{
          minWidth: "400px",
          maxWidth: "400px",
          width: "30vw",
          backgroundColor: "#080A29",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          zIndex: 1000,
          userSelect: "none",
          gap: 1,
        }}
        component={motion.div}
        drag
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.1 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        dragMomentum={false}
        dragConstraints={{
          top: 0,
          left: -0.7 * width,
          right: 0.04 * width,
          bottom: 0.38 * height,
        }}
      >
        <GripHorizontal size={30} color="#6D6D6D" cursor={"grab"} />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{ display: "flex", gap: 2, alignItems: "center", height: 20 }}
          >
            <TextQuestion size={24} color="white" />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                margin: "0 0 0 0 !important",
              }}
            >
              Explain & Rephrase
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
            }}
          >
            {summary === "" ? (
              <LoadingText />
            ) : (
              <Typography
                sx={{
                  color: "white",
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                {summary}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#181E82",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                paddingY: 1,
                paddingX: 2,
                width: "45%",
                display: "flex",
                gap: 2,
              }}
            >
              <Microscope size={20} color="white" />
              Deep Dive
            </Button>
          </Box>
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default ExplainWindow;
