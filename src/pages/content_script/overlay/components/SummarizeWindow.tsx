import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { readCache, writeToCache } from "../../../../utils/cache";
import Window from "./Window";

const SummarizeWindow = () => {
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    setSummary("");
    const url = window.location.href;
    readCache("nobel-summary").then((result) => {
      if (
        result["nobel-summary"] &&
        result["nobel-summary"].url &&
        result["nobel-summary"].url === url
      ) {
        setSummary(result["nobel-summary"].result);
        return;
      } else {
        axios
          .post(
            "https://essai-go-api-le4jqewulq-ue.a.run.app/api/summary/long",
            {
              url,
            }
          )
          .then((response) => {
            console.log(response.data.result);
            writeToCache("nobel-summary", {
              url: url,
              response: response.data.result,
            });
            setSummary(response.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, []);

  return <Window title="Summary" content={summary} />;
};

export default SummarizeWindow;
