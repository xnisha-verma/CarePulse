import { Stethoscope, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <div
      style={{
        padding: "24px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "#ffffff",
        borderRadius: 20,
        boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.04)",
        transition: "all 0.2s"
      }}
      onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(0,0,0,0.12)" }}
      onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(0,0,0,0.08)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--accent-dim)",
            border: "1px solid var(--border-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {doctor.profileImage ? (
            <img
              src={doctor.profileImage}
              alt={doctor.fullName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Stethoscope size={20} color="var(--accent)" />
          )}
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {doctor.fullName || "Dr. Unknown"}
          </p>
          <p style={{ color: "var(--accent)", fontSize: 13 }}>
            {doctor.specialization}
          </p>
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
        {doctor.hospitalName || "CarePulse Hospital"} · {doctor.experience || 0} yrs exp
      </p>
      <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
        {doctor.availableStartTime?.slice(0, 5)} - {doctor.availableEndTime?.slice(0, 5)}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link
          className="btn-accent"
          to={`/doctors/${doctor.id}`}
          style={{
            padding: "8px 18px",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
          }}
        >
          View & Book <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
