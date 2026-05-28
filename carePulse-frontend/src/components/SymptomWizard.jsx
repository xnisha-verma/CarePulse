import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Heart, Bone, Baby, User, Activity, ArrowRight, Stethoscope } from "lucide-react";

const symptoms = [
  { id: "NEUROLOGIST", label: "Head / Brain", icon: <Brain size={28} />, color: "#8b5cf6", bg: "#f5f3ff" },
  { id: "CARDIOLOGIST", label: "Heart / Chest", icon: <Heart size={28} />, color: "#ef4444", bg: "#fef2f2" },
  { id: "ORTHOPEDIC", label: "Bones / Joints", icon: <Bone size={28} />, color: "#f59e0b", bg: "#fffbeb" },
  { id: "PEDIATRICIAN", label: "Child Health", icon: <Baby size={28} />, color: "#10b981", bg: "#ecfdf5" },
  { id: "DERMATOLOGIST", label: "Skin Issues", icon: <User size={28} />, color: "#ec4899", bg: "#fdf2f8" },
  { id: "DENTIST", label: "Tooth / Gum", icon: <Activity size={28} />, color: "#0ea5e9", bg: "#f0f9ff" },
];

export default function SymptomWizard() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.1)", padding: "6px 16px", borderRadius: 50, marginBottom: 16, border: "1px solid rgba(16, 185, 129, 0.2)" }}>
          <Stethoscope size={14} color="#10b981" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: "0.08em", textTransform: "uppercase" }}>Symptom Checker</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 800, marginBottom: "10px", color: "#0f172a" }}>Not sure who to see?</h2>
        <p style={{ color: "#475569", fontSize: 15 }}>Select where you're experiencing discomfort, and we'll match you with the right specialist.</p>
      </div>

      {/* Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "32px" }}>
        {symptoms.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              padding: "28px 16px",
              borderRadius: "16px",
              border: selected === s.id ? `2px solid ${s.color}` : "2px solid transparent",
              background: selected === s.id ? s.bg : "#ffffff",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transform: selected === s.id ? "translateY(-4px) scale(1.02)" : "none",
              boxShadow: selected === s.id
                ? `0 12px 28px ${s.color}25`
                : "0 2px 12px rgba(0,0,0,0.04)",
            }}
            onMouseOver={(e) => {
              if (selected !== s.id) {
                e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}20`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (selected !== s.id) {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "none";
              }
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: selected === s.id ? `${s.color}15` : s.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.color,
              transition: "all 0.25s ease"
            }}>
              {s.icon}
            </div>
            <span style={{
              fontWeight: 700,
              fontSize: 14,
              color: selected === s.id ? s.color : "#1e293b",
              transition: "color 0.2s ease"
            }}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", justifyContent: "center", height: "54px" }}>
        {selected ? (
          <Link
            to={`/doctors?specialization=${selected}`}
            style={{
              background: symptoms.find(x => x.id === selected)?.color || "var(--accent)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "0 36px",
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: `0 12px 28px ${symptoms.find(x => x.id === selected)?.color}40`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 16px 32px ${symptoms.find(x => x.id === selected)?.color}50`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 12px 28px ${symptoms.find(x => x.id === selected)?.color}40`; }}
          >
            Find a {symptoms.find(x => x.id === selected)?.id.charAt(0) + symptoms.find(x => x.id === selected)?.id.slice(1).toLowerCase()} <ArrowRight size={18} />
          </Link>
        ) : (
          <div style={{ color: "#94a3b8", fontStyle: "italic", display: "flex", alignItems: "center", fontSize: 14 }}>
            Select an area above to continue
          </div>
        )}
      </div>
    </div>
  );
}
