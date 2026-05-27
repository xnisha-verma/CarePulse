import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--accent)", // The dark teal color
        color: "#ffffff",
        padding: "60px 40px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* Top part */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                marginBottom: 12
              }}
            >
              <Activity size={24} color="#ffffff" strokeWidth={2.5} />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#ffffff",
                  letterSpacing: "-0.03em"
                }}
              >
                CarePulse
              </span>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
              Intelligent Booking for Modern Healthcare
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 32 }}>
            <Link to="#" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              Privacy Policy
            </Link>
            <Link to="#" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              Terms
            </Link>
            <Link to="#" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom part */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
            © 2026 CarePulse. All rights reserved. Built with Spring Boot + React.
          </p>
        </div>
      </div>
    </footer>
  );
}
