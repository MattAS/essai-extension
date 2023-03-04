import { Box, Skeleton } from "@mui/material";

interface ILoadingArticlesProps {
  numArticles: number;
}

const LoadingArticles: React.FC<ILoadingArticlesProps> = ({ numArticles }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {Array.from(Array(numArticles).keys()).map((i) => (
        <Skeleton
          key={`Article-${i}`}
          variant="rectangular"
          width="49%"
          height="8vh"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.11)",
            borderRadius: 2,
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingArticles;
