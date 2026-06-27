import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Khalid Murtala — The Web3 Wizard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#050508",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #6366F120 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Indigo glow top left */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, #6366F130 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Cyan glow bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, #06B6D425 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10B981",
            }}
          />
          <span
            style={{
              color: "#4B5380",
              fontSize: "16px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            theweb3wizard.vercel.app
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "96px",
              fontWeight: "900",
              lineHeight: "1",
              background: "linear-gradient(135deg, #818CF8, #6366F1, #06B6D4)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            The Web3
          </span>
          <span
            style={{
              fontSize: "96px",
              fontWeight: "900",
              lineHeight: "1",
              color: "#FFFFFF",
              letterSpacing: "-2px",
            }}
          >
            Wizard
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "#94A3B8",
            fontSize: "24px",
            marginBottom: "48px",
            lineHeight: "1.5",
          }}
        >
          Product Engineer · Full-Stack Web3 × AI Builder.
          <br />
          High-execution building from chain to UI.
        </p>

        {/* Tool pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {[
            { name: "SolPulse", color: "#14F195" },
            { name: "Valor", color: "#10B981" },
            { name: "TxPreview", color: "#F59E0B" },
            { name: "SearchLens", color: "#6366F1" },
          ].map((tool) => (
            <div
              key={tool.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "100px",
                border: `1px solid ${tool.color}40`,
                background: `${tool.color}15`,
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: tool.color,
                }}
              />
              <span
                style={{
                  color: tool.color,
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right side — W3W logo */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "120px",
              fontWeight: "900",
              background: "linear-gradient(135deg, #6366F120, #06B6D420)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-4px",
              lineHeight: "1",
            }}
          >
            W3
          </span>
          <span
            style={{
              color: "#1C1C35",
              fontSize: "14px",
              letterSpacing: "4px",
              fontFamily: "monospace",
            }}
          >
            WIZARD
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}