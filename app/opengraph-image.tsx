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
            "radial-gradient(120% 120% at 75% 15%, #242824 0%, #161916 46%, #111311 100%)",
          color: "#ECE9E2",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#C68B4B",
          }}
        >
          Proton · Garopaba/SC
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#ECE9E2",
            maxWidth: 900,
          }}
        >
          Engenharia, arquitetura e regularização
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ width: 64, height: 3, background: "#C68B4B" }} />
          <div style={{ fontSize: 30, color: "rgba(236,233,226,0.6)" }}>
            Soluções completas — do projeto à obra entregue
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
