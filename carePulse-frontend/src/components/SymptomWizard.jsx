import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Heart, Bone, Baby, User, Activity, ArrowRight } from "lucide-react";

const symptoms = [
  { id: "NEUROLOGIST", label: "Head / Brain", icon: <Brain size={28} />, color: "#8b5cf6" },
  { id: "CARDIOLOGIST", label: "Heart / Chest", icon: <Heart size={28} />, color: "#ef4444" },
  { id: "ORTHOPEDIC", label: "Bones / Joints", icon: <Bone size={28} />, color: "#f59e0b" },
  { id: "PEDIATRICIAN", label: "Child Health", icon: <Baby size={28} />, color: "#10b981" },
  { id: "DERMATOLOGIST", label: "Skin Issues", icon: <User size={28} />, color: "#ec4899" },
  { id: "DENTIST", label: "Tooth / Gum", icon: <Activity size={28} />, color: "#0ea5e9" },
];

export default function SymptomWizard() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: "#ffffff", padding: "40px", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.05)", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Not sure who to see?</h2>
        <p style={{ color: "var(--text-secondary)" }}>Select where you're experiencing discomfort, and we'll match you with the right specialist.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {symptoms.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              padding: "24px 16px",
              borderRadius: "16px",
              border: selected === s.id ? `2px solid ${s.color}` : "2px solid rgba(0,0,0,0.05)",
              background: selected === s.id ? `${s.color}15` : "#f9fafb",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              transform: selected === s.id ? "translateY(-4px)" : "none",
              boxShadow: selected === s.id ? `0 12px 24px ${s.color}30` : "none"
            }}
          >
            <div style={{ color: s.color }}>{s.icon}</div>
            <span style={{ fontWeight: 600, color: selected === s.id ? s.color : "var(--text-primary)" }}>{s.label}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", height: "54px" }}>
        {selected ? (
          <Link
            to={`/doctors?specialization=${selected}`}
            style={{
              background: "var(--accent)",
              color: "#061117",
              textDecoration: "none",
              padding: "0 32px",
              borderRadius: "30px",
              fontWeight: 700,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 12px 24px rgba(0,212,170,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Find a {symptoms.find(x => x.id === selected)?.id.charAt(0) + symptoms.find(x => x.id === selected)?.id.slice(1).toLowerCase()} <ArrowRight size={18} />
          </Link>
        ) : (
          <div style={{ color: "var(--text-muted)", fontStyle: "italic", display: "flex", alignItems: "center" }}>
            Select an area above to continue
          </div>
        )}
      </div>
    </div>
  );
}
