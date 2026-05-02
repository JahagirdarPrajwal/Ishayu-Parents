import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ishayu — Real ingredients. Honest energy.";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, #F4D27A 0%, #F4EFE6 30%, #B7CE63 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          color: "#1F2A1B",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.7,
            display: "flex",
          }}
        >
          ishayu — protein & energy bars
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: "200px",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            display: "flex",
          }}
        >
          ishayu*
        </div>
        <div
          style={{
            marginTop: "16px",
            fontSize: "36px",
            fontStyle: "italic",
            opacity: 0.85,
            display: "flex",
          }}
        >
          Real ingredients. Honest energy.
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: "18px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.7,
            display: "flex",
          }}
        >
          A demo concept site · Bengaluru
        </div>
      </div>
    ),
    size
  );
}
