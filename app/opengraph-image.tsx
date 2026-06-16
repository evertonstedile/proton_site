import { ImageResponse } from "next/og";

// OG image dinâmica (compartilhamento Instagram/WhatsApp). Fonte: sans padrão do
// ImageResponse (Necmato é woff2, não suportada aqui) — composição de marca.
export const alt = "Proton Engenharia & Consultoria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 75% 15%, #1c1c20 0%, #0b0b0d 46%, #000 100%)",
          color: "#F4F3F1",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#D2AC62",
          }}
        >
          Proton · Blumenau/SC
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#FFFFFF",
            maxWidth: 900,
          }}
        >
          Engenharia residencial de alto padrão
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ width: 64, height: 3, background: "#D2AC62" }} />
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
            Precisão técnica e sofisticação
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
