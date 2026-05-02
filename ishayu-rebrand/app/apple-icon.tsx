import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4EFE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <g fill="#4A6A3A">
            <ellipse cx="32" cy="14" rx="5.4" ry="14" />
            <ellipse cx="32" cy="14" rx="5.4" ry="14" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="14" rx="5.4" ry="14" transform="rotate(120 32 32)" />
            <ellipse cx="32" cy="14" rx="5.4" ry="14" transform="rotate(180 32 32)" />
            <ellipse cx="32" cy="14" rx="5.4" ry="14" transform="rotate(240 32 32)" />
            <ellipse cx="32" cy="14" rx="5.4" ry="14" transform="rotate(300 32 32)" />
          </g>
          <circle cx="32" cy="32" r="3.4" fill="#F4EFE6" />
        </svg>
      </div>
    ),
    size
  );
}
