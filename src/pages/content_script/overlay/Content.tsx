import { Box, Grow, Tooltip, Typography, Zoom } from "@mui/material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  GripHorizontal,
  Microscope,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import EnhancedSearch from "../../../components/Icons/EnhancedSearch";
import TextQuestion from "../../../components/Icons/TextQuestion";
import TooltipIcon from "../../../components/TooltipIcon";
import SearchModal from "../search/components/SearchModal";
import { allowedList } from "./allowedList";
import DeepDiveModal from "./components/DeepDiveModal/DeepDiveModal";
import ShowWindow from "./components/Windows/ShowWindow";
import { useOutsideAlerter } from "./useOutsideAlerter";

const Content = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const [selection, setSelection] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isOpenWindow, setIsOpenWindow] = useState<
    "summarize" | "highlight" | "feedback" | "deepdive" | ""
  >("");
  const [showOverlay, setShowOverlay] = useState(false);
  const port = chrome.runtime.connect({ name: "nobel-overlay" });
  const [showClose, setShowClose] = useState(false);
  const [deepDiveFrom, setDeepDiveFrom] = useState<"explain" | "">("");

  const [withWhiteBorder, setWithWhiteBorder] = useState(false);

  useEffect(() => {
    port.postMessage({ message: "loaded" });
    const url = new URL(window.location.href);
    if (!"www".includes(url.hostname)) {
      url.hostname = "www." + url.hostname;
    }

    // Check if the current url matches https://dashboard.getnobel.io/* or https://localhost:3000/*
    const isDashboard = url.hostname.includes("dashboard.getnobel.io");
    const isLocalhost = url.hostname.includes("localhost");

    if (isDashboard || isLocalhost) {
      setWithWhiteBorder(true);
    }

    const isAllowed = allowedList.some((allowedUrl) => {
      const allowedUrlObj = new URL(allowedUrl);
      return allowedUrlObj.hostname === url.hostname;
    });
    if (isAllowed || isDashboard || isLocalhost) {
      setShowOverlay(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", (event) => {
      setSelection(document.getSelection()?.toString() || "");
    });
    return () => {
      document.removeEventListener("selectionchange", () => {});
    };
  });

  useEffect(() => {
    port.onMessage.addListener((msg: any) => {
      if (msg.message === "show") {
        setShowOverlay(!showOverlay);
      }
    });
  });

  useEffect(() => {
    if (selection === "" && isOpenWindow === "highlight") {
      setIsOpenWindow("");
    }
  }, [selection, isOpenWindow]);

  const handleClose = () => {
    setShowOverlay(false);
    setShowClose(false);
  };

  const handleOpenDeepDive = (from: string) => {
    console.log("handleOpenDeepDive");
    if (from === "explain") {
      setDeepDiveFrom("explain");
    } else {
      setDeepDiveFrom("");
    }
    setIsOpenWindow("deepdive");
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(
    wrapperRef,
    useCallback((isInBounds: boolean) => {
      if (!isInBounds) {
        setIsOpenWindow("");
      }
    }, [])
  );

  const handleSummary = async () => {
    const res = await fetch(window.location.href);
    const contentType = res.headers.get("content-type");
    setIsOpenWindow("summarize");
    if (contentType && contentType.includes("application/pdf")) {
      const blob = await res.blob();
      const formData = new FormData();
      const name = window.location.href.split("/").pop();
      if (!name) return;
      formData.append("pdf", blob);
      formData.append("name", name);
      try {
        const response = await fetch(
          "https://nobel-go-api-dev-le4jqewulq-ue.a.run.app/api/pdf/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.message == "File uploaded successfully") {
          // Open new tab with the pdf
          setIsOpenWindow("");
          window.open(
            `https://dashboard.getnobel.io/pdf/${name}`,
            "_blank",
            "noopener,noreferrer"
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpenWindow = (name: string) => {
    if (isOpenWindow === name) {
      setIsOpenWindow("");
      return;
    }
    if (name === "summarize") {
      // Check if page is a pdf from content-type
      handleSummary();
    } else if (name === "highlight") {
      setIsOpenWindow("highlight");
    } else if (name === "feedback") {
      setIsOpenWindow("feedback");
    }
  };

  return (
    <>
      {showOverlay && (
        <Box
          key={"overlay"}
          component={motion.div}
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { duration: 0.2 }, type: "spring" }}
          exit={{ x: "100%", transition: { duration: 0.2 } }}
          drag
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          dragMomentum={false}
          dragConstraints={{
            top: 0,
            left: -0.94 * width,
            right: 0,
            bottom: 0.75 * height,
          }}
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          {showOverlay && isOpenWindow !== "" && (
            <ShowWindow
              name={isOpenWindow}
              value={selection}
              ref={wrapperRef}
              key={"nobel-window"}
              buttonCallback={handleOpenDeepDive}
            />
          )}
          <Box
            sx={{
              display: "flex",
              height: "fit-content",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                paddingTop: "10px !important",
                paddingX: "15px !important",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#080A29",
                overflow: "hidden",
                paddingBottom: "10px!important",
                boxShadow: withWhiteBorder
                  ? "0px 0px 20px 0px rgba(255,255,255,0.20)"
                  : "",
              }}
              onMouseEnter={() => setShowClose(true)}
              onMouseLeave={() => setShowClose(false)}
            >
              <Box
                sx={{
                  height: "10px",
                  marginBottom: 3,
                }}
              >
                <GripHorizontal size={24} color="#6D6D6D" cursor={"grab"} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflow: "hidden",
                  height: showClose ? "195px" : "155px",
                  "&:hover": {
                    height: "195px",
                    transition: "height 0.2s ease-in-out",
                  },
                  transition: "height 0.2s ease-in-out",
                  gap: 2,
                }}
              >
                <TooltipIcon tooltip="Enhance Search">
                  <EnhancedSearch
                    color="white"
                    size={25}
                    cursor="pointer"
                    onClick={() => setOpenModal(true)}
                  />
                </TooltipIcon>
                <TooltipIcon tooltip="Summarize Page">
                  <FileQuestion
                    size={24}
                    color={"white"}
                    cursor={"pointer"}
                    onClick={() => {
                      handleOpenWindow("summarize");
                    }}
                  />
                </TooltipIcon>
                <TooltipIcon tooltip="Deep Dive">
                  <Microscope
                    size={25}
                    color={"white"}
                    cursor={"pointer"}
                    onClick={() => setIsOpenWindow("deepdive")}
                  />
                </TooltipIcon>
                <TooltipIcon tooltip="Explain Selection">
                  <TextQuestion
                    size={25}
                    color={selection === "" ? "#6D6D6D" : "white"}
                    cursor={"pointer"}
                    onClick={() =>
                      setIsOpenWindow(
                        isOpenWindow === "highlight" ? "" : "highlight"
                      )
                    }
                  />
                </TooltipIcon>
                <TooltipIcon tooltip="Close">
                  <X
                    size={25}
                    color={"white"}
                    cursor={"pointer"}
                    onClick={handleClose}
                  />
                </TooltipIcon>
              </Box>
              <Box
                sx={{
                  height: 18,
                }}
              >
                {showClose ? (
                  <ChevronUp size={18} color={"#6D6D6D"} />
                ) : (
                  <ChevronDown size={18} color={"#6D6D6D"} />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: 2,
                backgroundColor: "#080A29",
                padding: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: withWhiteBorder
                  ? "0px 0px 20px 0px rgba(255,255,255,0.20)"
                  : "",
              }}
            >
              <TooltipIcon
                tooltip="Send Feedback"
                sx={{
                  marginRight: "4px",
                }}
              >
                <Send
                  size={25}
                  color={"white"}
                  cursor={"pointer"}
                  onClick={() =>
                    setIsOpenWindow(
                      isOpenWindow === "feedback" ? "" : "feedback"
                    )
                  }
                />
              </TooltipIcon>
            </Box>
          </Box>
        </Box>
      )}

      <SearchModal
        opened={openModal}
        handleClose={() => setOpenModal(false)}
        inputValue=""
      />
      <DeepDiveModal
        opened={isOpenWindow === "deepdive"}
        handleClose={() => {
          setIsOpenWindow("");
          setDeepDiveFrom("");
        }}
        selection={selection}
        deepDiveFrom={deepDiveFrom}
      />
    </>
  );
};

export default Content;
