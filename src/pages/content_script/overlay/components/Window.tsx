import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import React from "react";
import { useEffect, useRef } from "react";
import TextQuestion from "../../../../components/Icons/TextQuestion";
import LoadingText from "../../../../components/loading/LoadingText";
interface IWindowProps {
  title: string;
  content: string;
  footer?: React.ReactNode;
}

type Ref = HTMLDivElement;

const Window = React.forwardRef<Ref, IWindowProps>(
  ({ title, content, footer }, ref) => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    return (
      <Box
        ref={ref}
        sx={{
          minWidth: "450px",
          maxWidth: "450px",
          height: "600px",
          backgroundColor: "#080A29",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
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
        <Box
          sx={{
            height: "5%",
          }}
        >
          <GripHorizontal size={30} color="#6D6D6D" cursor={"grab"} />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "95%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextQuestion size={24} color="white" />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                margin: "0 0 0 0 !important",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "80%",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            {content === "" ? (
              <LoadingText />
            ) : (
              <Typography
                sx={{
                  color: "white",
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                {content}
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
            {footer ? footer : null}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default Window;
