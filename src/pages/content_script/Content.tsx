import { Box, Fade, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalContent from "../../components/ModalContent";
import "./style.css";

const Content = () => {
  const [opened, setOpened] = useState(false);
  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };
  return (
    <>
      <div id="essai-widget" onClick={handleOpen} />
      <Modal
        open={opened}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
          // Transition
          "& .MuiModal-root": {
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <ModalContent />
      </Modal>
    </>
  );
};

export default Content;
