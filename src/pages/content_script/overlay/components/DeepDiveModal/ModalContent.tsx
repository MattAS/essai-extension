import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Microscope } from "lucide-react";
import { useEffect, useState } from "react";
import NobelLogoSquare from "../../../../../components/Icons/NobelLogoSquare";
import TextQuestion from "../../../../../components/Icons/TextQuestion";
import { readCache } from "../../../../../utils/cache";
import ContentSection from "./ContentSection";

interface IModalContentProps {
  deepDiveFrom: "explain" | "";
}

const ModalContent: React.FC<IModalContentProps> = ({ deepDiveFrom }) => {
  const [explain, setExplain] = useState<string>("");
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [deepDiveContent, setDeepDiveContent] = useState<string[]>([]);
  useEffect(() => {
    let context = "";
    if (deepDiveFrom === "explain") {
      readCache("nobel-highlight").then((result) => {
        if (result["nobel-highlight"] && result["nobel-highlight"].response) {
          setExplain(result["nobel-highlight"].response);
          context = result["nobel-highlight"].response;
          return;
        }
      });
    }

    if (context === "") {
      context = document.body.innerText.slice(0, 5000);
    }

    if (context === "") {
      return;
    }

    axios
      .post("https://nobel-go-api-le4jqewulq-ue.a.run.app/api/deepDive", {
        context: context,
      })
      .then((res) => {
        console.log(res.data);
        setNextSteps(res.data.steps);
        axios
          .post(
            "https://essai-go-api-le4jqewulq-ue.a.run.app/api/paper/by/keyword/batch",
            {
              keywords: res.data.keywords,
              searchForMoreKeywords: false,
            }
          )
          .then((res) => {
            const papers = res.data.map((paperRes: any) => paperRes.papers[0]);
            setDeepDiveContent(res.data.result);
          });
      });
  }, [deepDiveFrom]);

  return (
    <Box
      sx={{
        width: "50vw",
        height: "60vh",
        backgroundColor: "#080A29",
        display: "flex",
        borderRadius: 4,
        border: "none",
        "&:focus": {
          outline: "none",
        },
        padding: 4,
        paddingX: 6,
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        boxShadow: "0px 0px 4px rgba(125, 125, 125, 0.75)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 2,
        }}
      >
        <NobelLogoSquare size={35} />
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
          variant="h6"
        >
          Nobel
        </Typography>
      </Box>
      {deepDiveFrom === "explain" ? (
        <ContentSection
          title="Explain & Rephrase"
          icon={<TextQuestion size={24} color="white" />}
          canExpand={true}
        >
          <Typography
            sx={{
              color: "#9D9D9D",
              fontSize: 15,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {explain}
          </Typography>
        </ContentSection>
      ) : (
        <ContentSection
          title="Deep Dive"
          icon={<Microscope size={24} color="white" />}
          canExpand={false}
        >
          <Typography
            sx={{
              color: "#9D9D9D",
              fontSize: 15,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {explain}
          </Typography>
        </ContentSection>
      )}
    </Box>
  );
};

export default ModalContent;
