import { Button } from "@mui/material";
import axios from "axios";
import { Microscope } from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { readCache, writeToCache } from "../../../../utils/cache";
import Window from "./Window";

interface IExplainWindowProps {
  selection: string;
}

type Ref = HTMLDivElement;

const ExplainWindow = React.forwardRef<Ref, IExplainWindowProps>(
  ({ selection }, ref) => {
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
            .post(
              "https://essai-go-api-le4jqewulq-ue.a.run.app/api/summary/highlight",
              {
                text: selection,
              }
            )
            .then((response) => {
              console.log(response);
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
        <Button
          sx={{
            backgroundColor: "#624EE1",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            paddingY: 1,
            paddingX: 2,
            width: "45%",
            display: "flex",
            gap: 2,
            "&:hover": {
              backgroundColor: "#624EE1",
            },
          }}
        >
          <Microscope size={20} color="white" />
          Deep Dive
        </Button>
      );
    }, []);

    return (
      <Window
        title="Explain & Rephrase"
        content={summary}
        footer={DeepDiveButton}
        ref={ref}
      />
    );
  }
);

export default ExplainWindow;
