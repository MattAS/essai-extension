import React from "react";
import { Grow, IconButton, Tooltip } from "@mui/material";

interface ITooltipIconProps {
  children: React.ReactNode;
  tooltip: string;
  sx?: any;
}

const TooltipIcon: React.FC<ITooltipIconProps> = ({
  children,
  tooltip,
  sx,
  ...props
}) => {
  return (
    <Tooltip
      title={tooltip}
      {...props}
      placement="left"
      arrow
      TransitionComponent={Grow}
    >
      <span
        style={{
          height: "25px",
          ...sx,
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default TooltipIcon;
