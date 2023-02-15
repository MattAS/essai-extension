import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  FileQuestion,
  GripHorizontal,
  Microscope,
} from "lucide-react";
import { useEffect, useState } from "react";
import TextQuestion from "../../../components/Icons/TextQuestion";
import ExplainWindow from "./components/ExplainWindow";

const Content = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const [selection, setSelection] = useState("");
  const [openExplain, setOpenExplain] = useState(false);

  useEffect(() => {
    document.addEventListener("selectionchange", (event) => {
      setSelection(document.getSelection()?.toString() || "");
    });
    return () => {
      document.removeEventListener("selectionchange", () => {});
    };
  });

  const openExplanation = () => {
    console.log(openExplain);
    if (selection === "") {
      setOpenExplain(false);
      return;
    }
    setOpenExplain(!openExplain);
  };

  useEffect(() => {
    if (selection === "") {
      setOpenExplain(false);
      return;
    }
  }, [selection]);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {selection !== "" && openExplain && (
        <ExplainWindow
          selection={selection}
          shouldLoad={openExplain && selection !== ""}
        />
      )}
      <AnimatePresence>
        <motion.div
          id="essai-overlay-widget"
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { duration: 0.2 }, type: "spring" }}
          drag
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          dragMomentum={false}
          dragConstraints={{
            top: 0,
            left: -0.94 * width,
            right: 0,
            bottom: 0.7 * height,
          }}
        >
          <GripHorizontal size={30} color="#6D6D6D" cursor={"grab"} />
          <Box
            sx={{
              padding: 1,
              paddingTop: 2,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 3,
            }}
          >
            <FileQuestion size={24} color={"white"} cursor={"pointer"} />
            <Microscope size={24} color={"white"} cursor={"pointer"} />
            <TextQuestion
              size={24}
              color={selection === "" ? "#6D6D6D" : "white"}
              cursor={"pointer"}
              onClick={openExplanation}
            />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Content;
