import { Box, IconButton, Typography } from "@mui/material";
import { Maximize, Maximize2 } from "lucide-react";
import React from "react";

interface IContentSectionProps {
  title?: string;
  icon?: React.ReactNode;
  canExpand: boolean;
  children: React.ReactNode | React.ReactNode[];
  expandCallback?: () => void;
  sx?: any;
  fullWidth?: boolean;
}

const ContentSection: React.FC<IContentSectionProps> = ({
  title,
  icon,
  canExpand,
  children,
  expandCallback,
  fullWidth,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 3,
        minHeight: "fit-content",
        borderRadius: 4,
        gap: 2,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          width: fullWidth ? "fit-content" : "100%",
        }}
      >
        {icon && title && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: fullWidth ? "fit-content" : "100%",
            }}
          >
            {icon}
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                // Set no wrap
                width: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
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
