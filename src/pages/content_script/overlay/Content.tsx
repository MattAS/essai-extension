import { Box, Grow, Tooltip, Typography, Zoom } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { FileQuestion, GripHorizontal, Microscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EnhancedSearch from "../../../components/Icons/EnhancedSearch";
import MicroscopeCrossed from "../../../components/Icons/MicroscopeCrossed";
import TextQuestion from "../../../components/Icons/TextQuestion";
import SearchModal from "../search/components/SearchModal";
import { allowedList } from "./allowedList";
import ShowWindow from "./components/ShowWindow";

const Content = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const [selection, setSelection] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isOpenWindow, setIsOpenWindow] = useState<
    "summarize" | "highlight" | ""
  >("");
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!"www".includes(url.hostname)) {
      url.hostname = "www." + url.hostname;
    }
    console.log(url);
    const isAllowed = allowedList.some((allowedUrl) => {
      const allowedUrlObj = new URL(allowedUrl);
      console.log(allowedUrlObj.hostname);
      return allowedUrlObj.hostname === url.hostname;
    });
    if (isAllowed) {
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
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === "show") {
        setShowOverlay(!showOverlay);
      }
    });
  });

  useEffect(() => {
    if (selection === "" && isOpenWindow === "highlight") {
      setIsOpenWindow("");
    }
  }, [selection, isOpenWindow]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpenWindow("");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <AnimatePresence>
        {isOpenWindow !== "" && (
          <ShowWindow
            name={isOpenWindow}
            value={selection}
            ref={wrapperRef}
            key={"Window"}
          />
        )}
        {showOverlay && (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              height: "210px!important",
            }}
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
          >
            <Box
              sx={{
                borderRadius: "10px",
                padding: "18px !important",
                paddingTop: "10px !important",
                paddingX: "15px !important",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#080A29",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  height: "10px",
                  marginBottom: 1,
                }}
              >
                <GripHorizontal size={24} color="#6D6D6D" cursor={"grab"} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Tooltip
                  title="Search"
                  placement="left"
                  arrow
                  TransitionComponent={Grow}
                >
                  <span style={{ height: "25px" }}>
                    <EnhancedSearch
                      color="white"
                      size={25}
                      cursor="pointer"
                      onClick={() => setOpenModal(true)}
                    />
                  </span>
                </Tooltip>
                <Tooltip
                  title="Summarize Page"
                  placement="left"
                  arrow
                  TransitionComponent={Grow}
                  sx={{
                    "& .MuiTooltip-popper": {
                      backgroundColor: "#080A29",
                    },
                  }}
                >
                  <FileQuestion
                    size={24}
                    color={"white"}
                    cursor={"pointer"}
                    onClick={() => setIsOpenWindow("summarize")}
                  />
                </Tooltip>
                <Tooltip
                  title="Coming Soon"
                  placement="left"
                  arrow
                  TransitionComponent={Grow}
                >
                  <span
                    style={{
                      height: "25px",
                    }}
                  >
                    <MicroscopeCrossed size={26} color={"#6D6D6D"} />
                  </span>
                </Tooltip>
                <Tooltip
                  title="Explain Selection"
                  placement="left"
                  arrow
                  TransitionComponent={Grow}
                >
                  <span
                    style={{
                      height: "25px",
                    }}
                  >
                    <TextQuestion
                      size={25}
                      color={selection === "" ? "#6D6D6D" : "white"}
                      cursor={"pointer"}
                      onClick={() => setIsOpenWindow("highlight")}
                    />
                  </span>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        )}
        <SearchModal
          opened={openModal}
          handleClose={() => setOpenModal(false)}
          inputValue=""
        />
      </AnimatePresence>
    </Box>
  );
};

export default Content;
