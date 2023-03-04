import axios from "axios";
import { Microscope } from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../../../components/Button";
import TextQuestion from "../../../../../components/Icons/TextQuestion";
import { readCache, writeToCache } from "../../../../../utils/cache";
import Window from "./Window";

interface IExplainWindowProps {
  selection: string;
  buttonCallback: (from?: string) => void;
}

type Ref = HTMLDivElement;

const ExplainWindow = React.forwardRef<Ref, IExplainWindowProps>(
  ({ selection, buttonCallback }, ref) => {
    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
      setSummary("");
      readCache("nobel-highlight").then((result) => {
        console.log(result);
        if (
          result["nobel-highlight"] &&
          result["nobel-highlight"].response &&
          result["nobel-highlight"].selection.trim() === selection.trim()
        ) {
          setSummary(result["nobel-highlight"].response);
          return;
        } else {
          axios
            .post(process.env.API_ROUTE + "/summary/highlight", {
              text: selection,
            })
            .then((response) => {
              writeToCache("nobel-highlight", {
                response: response.data.summary,
                selection: selection,
              });
              setSummary(response.data.summary);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }, [selection]);

    const DeepDiveButton = useMemo(() => {
      return (
        summary !== "" && (
          <Button onClick={() => buttonCallback("explain")}>
            <Microscope size={20} color="white" />
            Deep Dive
          </Button>
        )
      );
    }, [buttonCallback, summary]);

    return (
      <Window
        title="Explain & Rephrase"
        content={summary}
        footer={DeepDiveButton}
        ref={ref}
        titleIcon={<TextQuestion size={24} color={"white"} />}
      />
    );
  }
);

export default ExplainWindow;
