import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Microscope } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import NobelLogoSquare from "../../../../../components/Icons/NobelLogoSquare";
import TextQuestion from "../../../../../components/Icons/TextQuestion";
import LoadingArticles from "../../../../../components/loading/LoadingArticles";
import RelatedArticles from "../../../../../components/RelatedArticles";
import { readCache } from "../../../../../utils/cache";
import ContentSection from "./ContentSection";

interface IModalContentProps {
  deepDiveFrom: "explain" | "";
}

const ModalContent: React.FC<IModalContentProps> = ({ deepDiveFrom }) => {
  const [explain, setExplain] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    readCache("nobel-deep-dive").then((result) => {
      if (result["nobel-deep-dive"] && result["nobel-deep-dive"].response) {
        setExplain(result["nobel-deep-dive"].response.context);
        setArticles(result["nobel-deep-dive"].response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (deepDiveFrom === "explain" && explain === "") {
      readCache("nobel-highlight").then((result) => {
        if (result["nobel-highlight"] && result["nobel-highlight"].response) {
          setExplain(result["nobel-highlight"].response);
        } else {
          setExplain(document.body.innerText.slice(100, 5100));
        }
      });
    } else {
      setExplain(document.body.innerText.slice(100, 5100));
    }
  }, [deepDiveFrom]);

  useEffect(() => {
    if (explain !== "" && articles.length === 0) {
      axios
        .post(process.env.API_ROUTE + "/deepDive/", {
          context: explain,
          excludeURL: window.location.href,
        })
        .then((res) => {
          setArticles(res.data.slice(0, 4));
          writeCache("nobel-deep-dive", {
            response: {
              context: explain,
              data: res.data.slice(0, 4),
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [explain]);

  const expandedCallback = () => {
    setExpanded(!expanded);
  };

  const textRef = useRef<HTMLDivElement>(null);
  const [isMaxLinesReached, setIsMaxLinesReached] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const element = textRef.current;
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        const lines: number = element.offsetHeight / (lineHeight * 3);

        if (lines > 1) {
          setIsMaxLinesReached(true);
        }
      }
    }, 100);
  }, []);

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
        gap: 5,
        boxShadow: "0px 0px 4px rgba(125, 125, 125, 0.75)",
        overflowY: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
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
      <Box
        sx={{
          width: "98%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          margin: 0,
          padding: 0,
          overflowY: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {deepDiveFrom === "explain" && (
          <ContentSection
            title="Explain & Rephrase"
            icon={<TextQuestion size={24} color="white" />}
            canExpand={isMaxLinesReached}
            expandCallback={expandedCallback}
          >
            <Typography
              ref={textRef}
              sx={{
                color: "#9D9D9D",
                fontSize: 15,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitLineClamp: expanded ? "unset" : 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {explain}
            </Typography>
          </ContentSection>
        )}
        {deepDiveFrom !== "explain" && (
          <ContentSection
            title="Deep Dive based on"
            icon={<Microscope size={24} color="white" />}
            canExpand={false}
            sx={{
              flexDirection: "row",
              paddingY: 1,
            }}
            fullWidth={true}
          >
            <Box
              sx={{
                marginLeft: 2,
              }}
            >
              <RelatedArticles
                fullWidth={true}
                clickable={false}
                paper={{
                  title: document.title,
                  isOpenAccess: true,
                  openAccessPdf: {
                    url: window.location.href,
                  },
                  url: window.location.href,
                }}
                iconSize={"30px"}
              />
            </Box>
          </ContentSection>
        )}
        <ContentSection canExpand={false}>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: "white",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 12,
                marginLeft: 2,
              }}
            >
              Related Articles and papers
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              {articles.length === 0 ? (
                <LoadingArticles numArticles={4} />
              ) : (
                articles.map((article, index) => {
                  return (
                    <RelatedArticles key={index} paper={article.papers[0]} />
                  );
                })
              )}
            </Box>
          </Box>
        </ContentSection>
      </Box>
    </Box>
  );
};

export default ModalContent;
function writeCache(arg0: string, arg1: { response: any }) {
  throw new Error("Function not implemented.");
}
