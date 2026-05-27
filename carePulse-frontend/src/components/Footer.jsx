import { Link } from "react-router-dom";
import { Activity, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a192f", // Deep navy blue
        color: "#ffffff",
        padding: "80px 24px 40px",
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
          }}
        >
          {/* Brand & Info */}
          <div style={{ flex: 2, minWidth: 280 }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                marginBottom: 20
              }}
            >
              <div style={{ background: "linear-gradient(135deg, #38bdf8, #3b82f6)", padding: 8, borderRadius: 12 }}>
                <Activity size={24} color="#ffffff" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 24,
                  color: "#ffffff",
                  letterSpacing: "-0.03em"
                }}
              >
                CarePulse
              </span>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 24, maxWidth: 300 }}>
              The modern, intelligent platform connecting patients with top-tier healthcare professionals instantly and securely.
            </p>
          </div>

          {/* Links - Platform */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Platform</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/doctors" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>Browse Doctors</Link>
              <Link to="/register" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>Join as Patient</Link>
              <Link to="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>Join as Doctor</Link>
              <Link to="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>CarePulse AI</Link>
            </div>
          </div>

          {/* Links - Support */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Support</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>Help Center</Link>
              <Link to="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>FAQ</Link>
              <Link to="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>Privacy Policy</Link>
              <Link to="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#ffffff"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>Terms of Service</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Contact Us</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 12 }}>
              <Mail size={16} /> support@carepulse.com
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>
              123 Health Ave, Suite 400<br/>New York, NY 10001
            </p>
          </div>
        </div>

        {/* Bottom part */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            © 2026 CarePulse. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
             <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
             <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600 }}>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
