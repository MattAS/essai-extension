import { Lock } from "lucide-react";
import React from "react";

interface IFaviconIconProps {
  openAccess: boolean;
  domain: string;
  iconSize?: number | string;
}

const FaviconIcon: React.FC<IFaviconIconProps> = ({
  openAccess,
  domain,
  iconSize = "40px",
}) => {
  return openAccess ? (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt="Nature"
      style={{
        width: iconSize,
        height: iconSize,
        backgroundColor: "rgba(129, 129, 129, 0.20)",
        padding: 10,
        borderRadius: 10,
      }}
      role="presentation"
      loading="lazy"
    />
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt="Nature"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(129, 129, 129, 0.20)",
          padding: 10,
          borderRadius: 10,
        }}
        role="presentation"
        loading="lazy"
      />
      <div
        style={{
          position: "absolute",
          width: "125%",
          height: "125%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Lock size={24} color="white" />
      </div>
    </div>
  );
};

export default FaviconIcon;
