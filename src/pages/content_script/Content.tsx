import { Box, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalContent from "../../components/ModalContent";
import "./style.css";

const Content = () => {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const input =
      (document.querySelector('[aria-label="Search"]') as HTMLInputElement) ||
      (document
        .getElementsByClassName("a4bIc")[0]
        .querySelector('[aria-label="Google Search"]') as HTMLInputElement);

    if (input && opened) {
      setInputValue(input.value);
    }
    console.log(input.value);
  }, [opened]);
  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };
  return (
    <div>
      <div id="essai-widget" onClick={handleOpen} />
      <Modal
        open={opened}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(8, 10, 41, 0.70)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <Fade in={opened}>
          <div>
            <ModalContent inputValue={inputValue} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Content;
