import { Box, IconButton, Typography } from "@mui/material";
import { Maximize, Maximize2 } from "lucide-react";
import React from "react";

interface IContentSectionProps {
  title: string;
  icon: React.ReactNode;
  canExpand: boolean;
  children: React.ReactNode | React.ReactNode[];
  expandCallback?: () => void;
}

const ContentSection: React.FC<IContentSectionProps> = ({
  title,
  icon,
  canExpand,
  children,
  expandCallback,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2vh",
        width: "98%",
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 3,
        minHeight: "fit-content",
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {icon}
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {title}
          </Typography>
        </Box>
        {canExpand ? (
          <IconButton
            sx={{
              color: "white",
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={expandCallback}
          >
            <Maximize2 size={20} color="white" />
          </IconButton>
        ) : null}
      </Box>
      {children}
    </Box>
  );
};

export default ContentSection;
