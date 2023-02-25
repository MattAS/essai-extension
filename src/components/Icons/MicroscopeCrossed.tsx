import "./style.css";

const MicroscopeCrossed: React.FC<IIconProps> = ({
  size,
  color,
  cursor = "",
  onClick = () => {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor }}
      onClick={onClick}
    >
      <path
        d="M4.5 10.5H9.16667"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.75 12.8334H13.25"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.16659 12.8333C10.2496 12.8333 11.2882 12.4031 12.0539 11.6373C12.8197 10.8715 13.2499 9.83293 13.2499 8.74996C13.2499 7.66699 12.8197 6.62838 12.0539 5.86261C11.2882 5.09683 10.2496 4.66663 9.16659 4.66663H8.58325"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.25 8.16663H7.41667"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.66675 3.5H8.00008"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.58325 5.83329V3.79163C8.58325 3.71427 8.55252 3.64008 8.49782 3.58539C8.44313 3.53069 8.36894 3.49996 8.29159 3.49996C8.21423 3.49996 8.14004 3.46923 8.08535 3.41453C8.03065 3.35983 7.99992 3.28565 7.99992 3.20829V1.74996C7.99992 1.59525 7.93846 1.44688 7.82906 1.33748C7.71967 1.22808 7.57129 1.16663 7.41659 1.16663H6.24992C6.09521 1.16663 5.94684 1.22808 5.83744 1.33748C5.72804 1.44688 5.66659 1.59525 5.66659 1.74996V3.20829C5.66659 3.28565 5.63586 3.35983 5.58116 3.41453C5.52646 3.46923 5.45227 3.49996 5.37492 3.49996C5.29756 3.49996 5.22338 3.53069 5.16868 3.58539C5.11398 3.64008 5.08325 3.71427 5.08325 3.79163V5.83329C5.08325 6.47496 5.60825 6.99996 6.24992 6.99996H7.41659C7.726 6.99996 8.02275 6.87704 8.24154 6.65825C8.46034 6.43946 8.58325 6.14271 8.58325 5.83329Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="1"
        y1="14.2929"
        x2="14.2929"
        y2="1"
        stroke={color}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default MicroscopeCrossed;
