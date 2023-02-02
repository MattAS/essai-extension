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
    <div>
      <div id="essai-widget" onClick={handleOpen} />
      <Modal
        open={opened}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(8, 10, 41, 0.70)",
          },
        }}
      >
        <Fade in={opened}>
          <div>
            <ModalContent />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Content;
