import { ImageResponse } from "next/og";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a73e8 0%, #1557b2 100%)",
          color: "white",
          fontFamily: "Geist, sans-serif",
          flexDirection: "column",
          textAlign: "center",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 800 }}>AIR-TRIP</div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9 }}>
          Passagens, hotéis e passeios
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
