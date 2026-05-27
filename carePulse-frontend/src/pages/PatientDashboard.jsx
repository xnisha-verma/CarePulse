/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = () => {
    setLoading(true);
    Promise.all([api.get("/appointments/my/upcoming"), api.get("/appointments/my/past")])
      .then(([upcomingRes, pastRes]) => {
        setUpcoming(upcomingRes.data);
        setPast(pastRes.data);
      })
      .catch((e) => setError(e.message || "Failed to load appointments"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const counts = {
    total: upcoming.length + past.length,
    approved: upcoming.filter((a) => a.status === "APPROVED").length,
    pending: upcoming.filter((a) => a.status === "PENDING").length,
  };

  const cancel = async (id) => {
    try {
      await api.put(`/appointments/${id}/cancel`);
      loadData();
    } catch (e) {
      setError(e.message || "Failed to cancel appointment");
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        <span className="label-tag">PATIENT DASHBOARD</span>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--accent)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 700,
                  margin: "0 0 4px",
                  color: "var(--text-primary)"
                }}
              >
                {user?.name || "Patient Account"}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: 14 }}>
                <span>{user?.email || "patient@carepulse.com"}</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span style={{ background: "var(--accent-dim)", color: "var(--accent)", padding: "2px 8px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>Patient</span>
              </div>
            </div>
          </div>
          <a href="/doctors" className="btn-accent" style={{ textDecoration: "none", padding: "10px 20px" }}>
            + Book New Appointment
          </a>
        </div>

        {/* stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {[
            {
              label: "Total",
              value: counts.total,
              icon: <Calendar size={18} />,
              color: "var(--accent)",
            },
            {
              label: "Approved",
              value: counts.approved,
              icon: <Clock size={18} />,
              color: "#00d4aa",
            },
            {
              label: "Pending",
              value: counts.pending,
              icon: <User size={18} />,
              color: "#ffc107",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="glass"
              style={{
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{ color: s.color }}>{s.icon}</div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    fontWeight: 700,
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    marginTop: 2,
                  }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* appointments list */}
        {error && (
          <p style={{ color: "var(--danger)", marginBottom: 16 }}>{error}</p>
        )}
        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {upcoming.length === 0 && past.length === 0 && (
              <div
                className="glass"
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                No appointments yet.{" "}
                <a href="/doctors" style={{ color: "var(--accent)" }}>
                  Book one now →
                </a>
              </div>
            )}
            <h3 style={{ marginTop: 8, marginBottom: 6 }}>Upcoming</h3>
            {upcoming.map((a) => (
              <div
                key={a.id}
                className="glass"
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--accent-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={16} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 500 }}>
                      {a.doctorName || "Doctor"}
                    </p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      {a.specialization} · {a.appointmentDate} at{" "}
                      {a.appointmentTime?.slice(0, 5)}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <StatusBadge status={a.status} />
                  {(a.status === "PENDING" || a.status === "APPROVED") && (
                    <button className="btn-ghost" onClick={() => cancel(a.id)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
            <h3 style={{ marginTop: 16, marginBottom: 6 }}>Past</h3>
            {past.map((a) => (
              <div key={a.id} className="glass" style={{ padding: "16px 20px" }}>
                <p style={{ fontWeight: 500 }}>{a.doctorName}</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  {a.specialization} · {a.appointmentDate} at{" "}
                  {a.appointmentTime?.slice(0, 5)}
                </p>
                <div style={{ marginTop: 8 }}>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
