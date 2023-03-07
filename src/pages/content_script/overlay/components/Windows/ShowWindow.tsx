import React from "react";
import ExplainWindow from "./ExplainWindow";
import FeedbackWindow from "./FeedbackWindow";
import SummarizeWindow from "./SummarizeWindow";

interface IShowWindowProps {
  name: "summarize" | "highlight" | "feedback" | "deepdive" | "";
  value: string;
  buttonCallback: (from: any) => void;
}

type Ref = HTMLDivElement;

const ShowWindow = React.forwardRef<Ref, IShowWindowProps>(
  ({ name, value, buttonCallback }, ref) => {
    if (name === "summarize") {
      return <SummarizeWindow ref={ref} />;
    } else if (name === "highlight") {
      return (
        <ExplainWindow
          selection={value}
          ref={ref}
          buttonCallback={buttonCallback}
        />
      );
    } else if (name === "feedback") {
      return <FeedbackWindow ref={ref} />;
    } else if (name === "") {
      return <></>;
    } else {
      return <></>;
    }
  }
);

export default ShowWindow;
