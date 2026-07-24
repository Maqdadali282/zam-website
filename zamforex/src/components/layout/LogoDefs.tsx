export default function LogoDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="zfTextGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--mint)" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
        <symbol id="zfLogoMark" viewBox="0 0 100 100">
          <rect
            x="3"
            y="3"
            width="94"
            height="94"
            rx="20"
            fill="var(--chip)"
            stroke="var(--mint)"
            strokeOpacity="0.35"
            strokeWidth="1.6"
          />
          <path
            d="M10 82 L82 10"
            stroke="var(--gold)"
            strokeOpacity="0.16"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <text
            x="50"
            y="67"
            textAnchor="middle"
            fontFamily="'Space Grotesk','Arial Black',sans-serif"
            fontWeight="700"
            fontSize="46"
            letterSpacing="-4"
            fill="url(#zfTextGrad)"
          >
            ZF
          </text>
          <path
            d="M71 33 L78 26 M78 26 L78 32 M78 26 L72 26"
            stroke="var(--mint)"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}
