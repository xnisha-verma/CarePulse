import { Link } from "react-router-dom";
import {
  Activity,
  Shield,
  Clock,
  Users,
  ChevronRight,
  Bot
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SymptomWizard from "../components/SymptomWizard";

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

      {/* Hero + Stats (one seamless section) */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 60px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Floating Cards (MediFlow inspired) */}
        <div className="floating" style={{ position: "absolute", top: "18%", left: "10%", background: "#ffffff", padding: "16px 24px", borderRadius: 16, boxShadow: "0 20px 40px rgba(19, 60, 85, 0.08)", border: "1px solid rgba(19, 60, 85, 0.05)", display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7" }}>
            <Users size={20} />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>1,200+</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Active Patients</p>
          </div>
        </div>
        
        <div className="floating-delayed" style={{ position: "absolute", top: "25%", right: "10%", background: "#ffffff", padding: "16px 24px", borderRadius: 16, boxShadow: "0 20px 40px rgba(19, 60, 85, 0.08)", border: "1px solid rgba(19, 60, 85, 0.05)", display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>
            <Activity size={20} />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>Verified</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Top Specialists</p>
          </div>
        </div>

        <div className="fade-up" style={{ maxWidth: 720, position: "relative", zIndex: 2 }}>
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

        {/* Stats - inline within the same section */}
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", paddingTop: 60 }}>
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
        </div>
      </section>

      {/* Symptom Checker Wizard */}
      <section id="symptoms" style={{
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        width: "100%"
      }}>
        {/* Top fade border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), rgba(139,92,246,0.3), transparent)" }} />
        {/* Bottom fade border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), rgba(139,92,246,0.3), transparent)" }} />
        
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SymptomWizard />
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{
          padding: "60px 24px",
          background: "#0b1120", /* Deep slate/blue like MediFlow */
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          color: "#ffffff"
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <span className="label-tag" style={{ background: "rgba(255,255,255,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}>FEATURES</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              marginBottom: 32,
              color: "#ffffff"
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
                style={{ 
                  padding: "40px 28px", 
                  textAlign: "left", 
                  background: "rgba(255,255,255,0.03)", 
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  transition: "transform 0.3s, background 0.3s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    marginBottom: 20,
                    background: "rgba(56,189,248,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#38bdf8",
                    boxShadow: "0 0 20px rgba(56,189,248,0.2)"
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    marginBottom: 10,
                    color: "#ffffff",
                    fontSize: 18
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
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
      {/* AI Chatbot Feature Highlights */}
      <section
        style={{
          padding: "80px 24px",
          background: "radial-gradient(ellipse at bottom right, rgba(79, 70, 229, 0.05), transparent 50%), transparent",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div style={{ maxWidth: 1100, width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 60, alignItems: "center" }}>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #4f46e5, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
              }}
            >
              <Bot size={32} color="#ffffff" />
            </div>
            <span className="label-tag" style={{ background: "rgba(79, 70, 229, 0.1)", color: "#4f46e5", border: "1px solid rgba(79, 70, 229, 0.2)" }}>MEET CAREPULSE AI</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                marginBottom: 20,
                color: "var(--text-primary)",
                lineHeight: 1.2
              }}
            >
              Your Intelligent<br/>Healthcare Assistant
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.7, marginBottom: 30 }}>
              Experience the future of healthcare scheduling with our built-in AI chatbot. It instantly understands your symptoms, guides you to the right medical specialists, and helps you navigate the platform 24/7.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Symptom Analysis", "Doctor Recommendations", "24/7 Instant Support"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-primary)", fontWeight: 600 }}>
                  <div style={{ background: "#dcfce7", color: "#16a34a", borderRadius: "50%", padding: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Interactive Chat Mockup */}
          <div className="floating" style={{ background: "#ffffff", borderRadius: 24, padding: 24, boxShadow: "0 20px 60px rgba(79, 70, 229, 0.15)", border: "1px solid rgba(79, 70, 229, 0.1)" }}>
             <div style={{ display: "flex", gap: 12, marginBottom: 20, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
               <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #4f46e5, #ec4899)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <Bot size={20} color="#ffffff" />
               </div>
               <div>
                 <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>CarePulse AI</p>
                 <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Online</p>
               </div>
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
               <div style={{ background: "#f1f5f9", padding: "16px 20px", borderRadius: "20px 20px 20px 4px", color: "var(--text-primary)", fontSize: 15, width: "85%" }}>
                 Hello! I'm experiencing frequent headaches and blurry vision. Who should I see?
               </div>
               <div style={{ background: "linear-gradient(135deg, #4f46e5, #ec4899)", padding: "16px 20px", borderRadius: "20px 20px 4px 20px", color: "#ffffff", fontSize: 15, width: "90%", alignSelf: "flex-end", boxShadow: "0 4px 15px rgba(236, 72, 153, 0.2)" }}>
                 Based on your symptoms, I recommend booking an appointment with a <strong>Neurologist</strong> or an <strong>Ophthalmologist</strong>. Would you like me to show you available doctors in these specialties?
               </div>
             </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          background: "transparent",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div style={{
          background: "linear-gradient(135deg, #133c55, #0a2538)",
          borderRadius: 32,
          padding: "80px 40px",
          textAlign: "center",
          maxWidth: 1000,
          width: "100%",
          boxShadow: "0 30px 60px rgba(19, 60, 85, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative background circles */}
          <div style={{ position: "absolute", top: "-50%", left: "-10%", width: 400, height: 400, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", bottom: "-50%", right: "-10%", width: 400, height: 400, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }}></div>
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                marginBottom: 20,
                color: "#ffffff"
              }}
            >
              Ready to take control of your health?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 48, fontSize: 18, maxWidth: 600, margin: "0 auto 48px" }}>
              Join thousands of patients who trust CarePulse for instant, hassle-free healthcare scheduling.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/register"
                style={{ 
                  background: "#ffffff", 
                  color: "#133c55", 
                  textDecoration: "none", 
                  fontSize: 16, 
                  fontWeight: 700, 
                  padding: "16px 36px", 
                  borderRadius: 12,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Create Free Account
              </Link>
              <Link
                to="/doctors"
                style={{ 
                  background: "rgba(255,255,255,0.1)", 
                  color: "#ffffff", 
                  textDecoration: "none", 
                  fontSize: 16, 
                  fontWeight: 600, 
                  padding: "16px 36px", 
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                Browse Doctors
              </Link>
            </div>
            
            <div style={{ marginTop: 40, display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex" }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: "#e0f2fe", border: "2px solid #133c55", marginLeft: i !== 1 ? -12 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7", fontSize: 12, fontWeight: "bold" }}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500 }}>Over 10,000+ happy patients</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
