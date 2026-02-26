import React from "react";

type LogoProps = {
  className?: string;
};

/**
 * ChePrecio — Logo
 *
 * Badge SVG + wordmark HTML en flexbox.
 * El texto usa CSS normal para heredar Inter correctamente.
 *
 * Tamaños recomendados vía className:
 *   Landing:    "h-14"
 *   Header:     "h-10"
 *   Compacto:   "h-7"
 */
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}
      role="img"
      aria-label="ChePrecio"
    >
      {/* Badge SVG — triband celeste/blanco/celeste con $ sol */}
      <svg
        style={{ height: "100%", width: "auto" }}
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="badge-clip">
            <rect x="0" y="0" width="60" height="60" rx="20" />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="60" height="20" fill="#74ACDF" clipPath="url(#badge-clip)" />
        <rect x="0" y="20" width="60" height="20" fill="#ffffff" clipPath="url(#badge-clip)" />
        <rect x="0" y="40" width="60" height="20" fill="#74ACDF" clipPath="url(#badge-clip)" />
        <text
          x="30"
          y="33"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="32"
          fontWeight="300"
          fill="#F6B40E"
          stroke="#A0670A"
          strokeWidth="3"
          paintOrder="stroke"
        >
          $
        </text>
      </svg>

      {/* Wordmark — texto HTML para heredar la fuente del CSS */}
      <span
        style={{
          fontFamily: "Inter, Manrope, 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: "1em",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 900, color: "#74ACDF" }}>Che</span>
        <span style={{ fontWeight: 700 }}>Precio</span>
      </span>
    </div>
  );
};

/**
 * LogoIcon — solo el badge, sin wordmark.
 * Para favicon, espacios reducidos o app icon.
 */
const LogoIcon: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label="ChePrecio"
    >
      <defs>
        <clipPath id="icon-clip">
          <rect x="0" y="0" width="60" height="60" rx="20" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="60" height="20" fill="#74ACDF" clipPath="url(#icon-clip)" />
      <rect x="0" y="20" width="60" height="20" fill="#ffffff" clipPath="url(#icon-clip)" />
      <rect x="0" y="40" width="60" height="20" fill="#74ACDF" clipPath="url(#icon-clip)" />
      <text
        x="30"
        y="33"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="32"
        fontWeight="300"
        fill="#F6B40E"
        stroke="#A0670A"
        strokeWidth="3"
        paintOrder="stroke"
      >
        $
      </text>
    </svg>
  );
};

export { Logo, LogoIcon };