import React from "react";

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ChePrecio"
    >
      {/* Bandera argentina (más angosta y centrada) */}
      <rect x="70" y="0" width="460" height="66" fill="#74ACDF" />
      <rect x="70" y="66" width="460" height="68" fill="#ffffff" />
      <rect x="70" y="134" width="460" height="66" fill="#74ACDF" />

      <text
        x="315"
        y="130"
        textAnchor="middle"
        fontFamily="Pacifico, cursive"
        fontSize="68"
        
      >
        ChePrecio
      </text>
    </svg>
  );
};

export { Logo };
