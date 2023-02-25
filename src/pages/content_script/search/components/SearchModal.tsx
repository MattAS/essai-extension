import { Modal, Fade, Box, Typography } from "@mui/material";
import React from "react";
import NobelLogoSquare from "../../../../components/Icons/NobelLogoSquare";
import ModalContent from "./ModalContent";

interface ISearchModalProps {
  opened: boolean;
  handleClose: () => void;
  inputValue: string;
}

const SearchModal: React.FC<ISearchModalProps> = ({
  opened,
  handleClose,
  inputValue,
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
          <ModalContent inputValue={inputValue} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "white" }}>Powered by</Typography>
            <NobelLogoSquare size={24} />
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default SearchModal;
