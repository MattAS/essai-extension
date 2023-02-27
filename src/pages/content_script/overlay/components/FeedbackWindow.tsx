import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";
import Button from "../../../../components/Button";
import NobelLogoSquare from "../../../../components/Icons/NobelLogoSquare";

const FeedbackWindow = React.forwardRef(({}, ref) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const [feedback, setFeedback] = React.useState("");
  const [feedbackLoading, setFeedbackLoading] = React.useState(false);
  const [submitButton, setSubmitButton] = React.useState<
    string | React.ReactNode
  >("Submit Feedback");

  const submitFeedback = (e: any) => {
    e.preventDefault();
    setFeedbackLoading(true);
    axios
      .post("https://feeder-node-1337.herokuapp.com/feedback/create", {
        projectId: "63fd12533e99f10002314243",
        feedbackMsg: feedback,
        feedbackType: "extension feedback",
      })
      .then((res) => {
        if (res.status === 200) {
          setFeedbackLoading(false);
          setFeedback("");
          setSubmitButton(<Check size={24} />);
          setTimeout(() => {
            setSubmitButton("Submit Feedback");
          }, 2000);
        }
      });
  };

  return (
    <Box
      ref={ref}
      sx={{
        minWidth: "350px",
        maxWidth: "350px",
        height: "350px",
        backgroundColor: "#080A29",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        padding: 3,
        paddingY: 4,
        zIndex: 1000,
        userSelect: "none",
        gap: 3,
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
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <NobelLogoSquare size={30} />
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Nobel
        </Typography>
      </Box>
      <TextField
        placeholder="Tell us what you'd like to see made or changed"
        multiline
        onChange={(e) => setFeedback(e.target.value)}
        value={feedback}
        sx={{
          overflow: "scroll",
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          height: "80%",
          width: "100%",
          borderRadius: 3,
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },

          "& .MuiOutlinedInput-root": {
            border: "none",
            "& fieldset": {
              borderColor: "none",
              border: "none",
            },
            "&:hover fieldset": {
              borderColor: "none",
              border: "none",
            },
            "&.Mui-focused fieldset": {
              borderColor: "none",
              border: "none",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
            "&::placeholder": {
              color: "#9295BE",
            },
            fontSize: "0.9rem",
          },
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button loading={feedbackLoading} onClick={submitFeedback}>
          {submitButton}
        </Button>
      </Box>
    </Box>
  );
});

export default FeedbackWindow;
