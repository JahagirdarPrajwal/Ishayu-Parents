import { ImageResponse } from "next/og";
import { getBar, BARS } from "@/lib/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ishayu — protein and energy bars";

export async function generateImageMetadata() {
  return BARS.map((b) => ({ id: b.slug, alt: b.name, size, contentType }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const bar = getBar(params.slug);
  if (!bar) return new ImageResponse(<div />, size);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bar.signature.light,
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          color: bar.signature.dark,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.8,
            display: "flex",
          }}
        >
          {bar.ribbon}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: "120px",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            fontWeight: 700,
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>{bar.shortName}</span>
        </div>
        <div
          style={{
            marginTop: "16px",
            fontSize: "32px",
            fontStyle: "italic",
            opacity: 0.85,
            display: "flex",
            maxWidth: "75%",
          }}
        >
          {bar.tagline}
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          <span>ishayu *</span>
          <span>₹{bar.priceINR} · 54 g</span>
        </div>
      </div>
    ),
    size
  );
}
