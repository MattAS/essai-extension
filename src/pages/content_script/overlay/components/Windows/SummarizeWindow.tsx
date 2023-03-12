import axios from "axios";
import { FileQuestion } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import Window from "./Window";
import * as pdfjsLib from "pdfjs-dist";

interface ISummarizeWindowProps {}

type Ref = HTMLDivElement;

const SummarizeWindow = React.forwardRef<Ref, ISummarizeWindowProps>(
  ({}, ref) => {
    const [summary, setSummary] = useState<string>("");

    async function loadPdf(blob: Blob) {
      // Convert blob to array buffer
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
      const arrayBuffer = await blob.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

      // Get all pages text
      const pagesText = await Promise.all(
        new Array(pdf.numPages).fill(null).map(async (_, index) => {
          const page = await pdf.getPage(index + 1);
          const textContent = await page.getTextContent();
          const textItems = textContent.items;
          const finalString = textItems.map((item: any) => item.str).join(" ");
          return finalString;
        })
      );

      return pagesText.join("\n\n");
    }

    useEffect(() => {
      const url = window.location.href;

      // Check if url is has "localhost:3000/pdf" or "dashboard.getnobel.io/pdf"
      console.log(url);
      if (
        url.includes("localhost:3000/pdf") ||
        url.includes("dashboard.getnobel.io/pdf")
      ) {
        // File name is the last part of the url
        const fileName = url.split("/").pop();
        // Get the pdf file from the server
        axios
          .get(process.env.API_ROUTE + `/pdf/download/${fileName}`, {
            responseType: "arraybuffer",
          })
          .then((res) => {
            // Convert string to blob
            const blob = new Blob([res.data], { type: "application/pdf" });

            // Convert the pdf to text
            loadPdf(blob).then((text) => {
              // Send the text to the server to get the summary
              axios
                .post(process.env.API_ROUTE + "/summary/long/web", {
                  context: text,
                  url: url,
                })
                .then((response) => {
                  setSummary(response.data.result);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
      }
      // Get body html of the page
      // fetch(url).then((response) => {
      //   // Check if the response is a pdf
      //   if (response.headers.get("content-type")?.includes("html")) {
      //     const body = document.body.innerText.replace("\n", " ");
      //     axios
      //       .post(process.env.API_ROUTE + "/summary/long/web", {
      //         context: body,
      //         url: url,
      //       })
      //       .then((response) => {
      //         setSummary(response.data.result);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   }
      // });
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
