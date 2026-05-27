import { Link } from "react-router-dom";
import {
  Activity,
  Shield,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { value: "1,200+", label: "Appointments Booked" },
  { value: "50+", label: "Doctors Onboarded" },
  { value: "< 2min", label: "Booking Time" },
  { value: "98%", label: "Patient Satisfaction" },
];

const features = [
  {
    icon: <Activity size={22} />,
    title: "Real-Time Booking",
    desc: "Browse available slots and confirm your appointment instantly.",
  },
  {
    icon: <Shield size={22} />,
    title: "Secure & Private",
    desc: "Role-based access with JWT authentication keeps your data safe.",
  },
  {
    icon: <Clock size={22} />,
    title: "Smart Scheduling",
    desc: "Doctors manage their own slots. No conflicts, no double bookings.",
  },
  {
    icon: <Users size={22} />,
    title: "Doctor Dashboard",
    desc: "Approve, reject, and track appointments from a live panel.",
  },
];

export default function Landing() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "160px 24px 80px",
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, #ffffff 0%, transparent 60%)"
        }}
      >
        <div className="fade-up" style={{ maxWidth: 720 }}>
          <span className="label-tag">HEALTHCARE BOOKING PLATFORM</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em"
            }}
          >
            Book Doctors.
            <br />
            <span className="gradient-text">Skip the Wait.</span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 18,
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            A smarter way to connect patients with the right doctors —
            instantly, securely, and without the paperwork.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/register"
              className="btn-accent pulse"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 15,
                padding: "14px 32px"
              }}
            >
              Get Started Free <ChevronRight size={16} />
            </Link>
            <Link
              to="/doctors"
              className="btn-ghost"
              style={{ textDecoration: "none", fontSize: 15, padding: "14px 32px", background: "#ffffff", border: "1px solid var(--border)" }}
            >
              Browse Doctors
            </Link>
          </div>

          {/* trust bar */}
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {["Secure Auth", "Instant Booking", "Role-Based Access"].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "6px 16px",
                    borderRadius: 50,
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  ✓ {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass"
              style={{ padding: "32px 24px", textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em"
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{
          padding: "100px 24px",
          background: "#ffffff",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <span className="label-tag">FEATURES</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              marginBottom: 48,
              color: "var(--text-primary)"
            }}
          >
            Everything You Need
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="glass"
                style={{ padding: "40px 28px", textAlign: "left", background: "var(--bg-primary)" }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    marginBottom: 20,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    marginBottom: 10,
                    color: "var(--text-primary)"
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "100px 24px",
          textAlign: "center",
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)"
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            marginBottom: 16,
            color: "var(--text-primary)"
          }}
        >
          Ready to book your appointment?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 40, fontSize: 16 }}>
          Join thousands of patients already using CarePulse.
        </p>
        <Link
          to="/register"
          className="btn-accent"
          style={{ textDecoration: "none", fontSize: 16, padding: "16px 36px" }}
        >
          Create Free Account
        </Link>
      </section>

      <Footer />
    </div>
  );
}
