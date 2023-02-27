import React from "react";
import { Grow, IconButton, Tooltip } from "@mui/material";

interface ITooltipIconProps {
  children: React.ReactNode;
  tooltip: string;
}

const TooltipIcon: React.FC<ITooltipIconProps> = ({
  children,
  tooltip,
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
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default TooltipIcon;
