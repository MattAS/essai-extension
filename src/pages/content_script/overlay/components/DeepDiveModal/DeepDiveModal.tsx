import React from "react";
import NobelLogoSquare from "../../../../../components/Icons/NobelLogoSquare";
import { Box, Fade, Modal, Typography } from "@mui/material";
import ModalContent from "./ModalContent";

interface IDeepDiveModalProps {
  opened: boolean;
  handleClose: () => void;
  selection: string;
  deepDiveFrom: "explain" | "";
}

const DeepDiveModal: React.FC<IDeepDiveModalProps> = ({
  opened,
  handleClose,
  selection,
  deepDiveFrom,
}) => {
  return (
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
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
            outline: "none",
            border: "none",
          }}
        >
          <ModalContent deepDiveFrom={deepDiveFrom} />
        </div>
      </Fade>
    </Modal>
  );
};

export default DeepDiveModal;
