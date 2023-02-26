import { Box, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NobelLogo from "../../../components/Icons/NobelLogo";
import NobelLogoSquare from "../../../components/Icons/NobelLogoSquare";
import ModalContent from "./components/ModalContent";
import SearchModal from "./components/SearchModal";
import "./style.css";

const Content = () => {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    const input =
      (document.querySelector('[aria-label="Search"]') as HTMLInputElement) ||
      (document
        .getElementsByClassName("a4bIc")[0]
        .querySelector('[aria-label="Google Search"]') as HTMLInputElement);

    if (input ) {
      setInputValue(input.value);
    }
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };
  return (
    <>
      <div id="nobel-widget" onClick={handleOpen}>
        <NobelLogoSquare size={24} />
      </div>
      <SearchModal
        opened={opened}
        handleClose={handleClose}
        inputValue={inputValue}
      />
    </>
  );
};

export default Content;
