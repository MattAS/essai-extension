import "./style.css";

const NobelLogo: React.FC<Omit<IIconProps, "color" | "cursor" | "onClick">> = ({
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 198 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M98.62 197.63C153.086 197.63 197.24 153.476 197.24 99.01C197.24 44.5437 153.086 0.390015 98.62 0.390015C44.1537 0.390015 0 44.5437 0 99.01C0 153.476 44.1537 197.63 98.62 197.63Z"
        fill="#F0EFEF"
      />
      <path
        d="M87.4225 97.205L100.341 110.124C102.442 112.225 105.849 112.225 107.95 110.124L109.668 108.406C111.769 106.305 111.769 102.898 109.668 100.797L96.7492 87.8783C94.6482 85.7773 91.2418 85.7773 89.1407 87.8783L87.4225 89.5966C85.3215 91.6976 85.3215 95.104 87.4225 97.205Z"
        fill="url(#paint0_linear_226_134)"
      />
      <path
        d="M140.8 54.88H138.42C133.73 54.88 129.93 58.68 129.93 63.37V123.2H113.37C108.68 123.2 104.88 127 104.88 131.69V135.21C104.88 139.9 108.68 143.7 113.37 143.7H140.8C145.49 143.7 149.29 139.9 149.29 135.21V63.37C149.29 58.68 145.49 54.88 140.8 54.88Z"
        fill="url(#paint1_linear_226_134)"
      />
      <path
        d="M83.87 54.3101H56.44C51.75 54.3101 47.95 58.1101 47.95 62.8001V134.64C47.95 139.33 51.75 143.13 56.44 143.13H58.82C63.51 143.13 67.31 139.33 67.31 134.64V74.8101H83.87C88.56 74.8101 92.36 71.0101 92.36 66.3201V62.8001C92.36 58.1101 88.56 54.3101 83.87 54.3101Z"
        fill="url(#paint2_linear_226_134)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_226_134"
          x1="84.7429"
          y1="84.0691"
          x2="113.333"
          y2="114.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CFA8CE" />
          <stop offset="0.5" stop-color="#839CD0" />
          <stop offset="0.67" stop-color="#96B3DC" />
          <stop offset="0.98" stop-color="#B8DBF1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_226_134"
          x1="89.8"
          y1="46.3"
          x2="173.67"
          y2="165.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CFA8CE" />
          <stop offset="0.5" stop-color="#839CD0" />
          <stop offset="0.65" stop-color="#96B3DC" />
          <stop offset="0.92" stop-color="#B8DBF1" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_226_134"
          x1="35.08"
          y1="68.2701"
          x2="138.68"
          y2="158.21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CFA8CE" />
          <stop offset="0.5" stop-color="#839CD0" />
          <stop offset="0.67" stop-color="#96B3DC" />
          <stop offset="0.98" stop-color="#B8DBF1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NobelLogo;
