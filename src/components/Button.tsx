import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface IButtonProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: (e: any) => void;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  loading = false,
}) => {
  return (
    <LoadingButton
      loading={loading}
      sx={{
        backgroundColor: "#624EE1",
        color: "white",
        textTransform: "none",
        fontWeight: "bold",
        paddingY: 1,
        paddingX: 2,
        minWidth: "200px",
        display: "flex",
        gap: 2,
        "&:hover": {
          backgroundColor: "#624EE1",
        },
      }}
      onClick={onClick}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
