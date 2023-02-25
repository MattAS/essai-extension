import React from "react";
import ExplainWindow from "./ExplainWindow";
import SummarizeWindow from "./SummarizeWindow";

interface IShowWindowProps {
  name: "summarize" | "highlight" | "";
  value: string;
}

const ShowWindow: React.FC<IShowWindowProps> = ({ name, value }) => {
  if (name === "summarize") {
    return <SummarizeWindow />;
  } else if (name === "highlight") {
    return <ExplainWindow selection={value} />;
  } else {
    return <></>;
  }
};

export default ShowWindow;
