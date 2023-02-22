import { Box, Skeleton } from "@mui/material";

const LoadingArticles = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {Array.from(Array(2).keys()).map((i) => (
        <Skeleton
          key={`Article-${i}`}
          variant="rectangular"
          width="48%"
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
