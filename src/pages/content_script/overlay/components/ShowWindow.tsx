import React from "react";
import ExplainWindow from "./ExplainWindow";
import SummarizeWindow from "./SummarizeWindow";

interface IShowWindowProps {
  name: "summarize" | "highlight" | "";
  value: string;
}

type Ref = HTMLDivElement;

const ShowWindow = React.forwardRef<Ref, IShowWindowProps>(
  ({ name, value }, ref) => {
    if (name === "summarize") {
      return <SummarizeWindow ref={ref} />;
    } else if (name === "highlight") {
      return <ExplainWindow selection={value} ref={ref} />;
    } else {
      return <></>;
    }
  }
);

export default ShowWindow;
