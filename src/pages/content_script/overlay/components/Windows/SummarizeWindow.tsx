import axios from "axios";
import { FileQuestion } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { readCache, writeToCache } from "../../../../../utils/cache";
import Window from "./Window";

interface ISummarizeWindowProps {}

type Ref = HTMLDivElement;

const SummarizeWindow = React.forwardRef<Ref, ISummarizeWindowProps>(
  ({}, ref) => {
    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
      setSummary("");
      const url = window.location.href;
      axios
        .post("https://essai-go-api-le4jqewulq-ue.a.run.app/api/summary/long", {
          url,
        })
        .then((response) => {
          setSummary(response.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
      <Window
        title="Summary"
        content={summary}
        ref={ref}
        titleIcon={<FileQuestion size={24} color={"white"} />}
      />
    );
  }
);

export default SummarizeWindow;
