import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [pending, setPending] = useState([]);
  const [today, setToday] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [tab, setTab] = useState("pending");
  const [error, setError] = useState("");

  const loadDashboard = () => {
    Promise.all([
      api.get("/appointments/doctor"),
      api.get("/appointments/pending"),
      api.get("/appointments/today"),
    ])
      .then(([allRes, pendingRes, todayRes]) => {
        setAppointments(allRes.data);
        setPending(pendingRes.data);
        setToday(todayRes.data);
        setCompleted(allRes.data.filter((a) => a.status === "COMPLETED"));
      })
      .catch((e) => setError(e.message || "Failed to load dashboard data"));
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const updateStatus = async (id, status) => {
    setError("");
    try {
      await api.put(`/appointments/${id}/status?status=${status}`);
      setPending((p) => p.filter((a) => a.id !== id));
      loadDashboard();
    } catch (e) {
      setError(e.message || "Failed to update appointment");
    }
  };

  const tabs = [
    { key: "pending", label: `Pending (${pending.length})` },
    { key: "today", label: `Today's Schedule (${today.length})` },
    { key: "completed", label: `Completed (${completed.length})` },
  ];
  const totalPatients = new Set(appointments.map((a) => a.patientEmail)).size;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        <span className="label-tag">DOCTOR DASHBOARD</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 700,
            marginBottom: 8,
            color: "var(--text-primary)"
          }}
        >
          Welcome, Dr. {user?.name || "Doctor"}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Here is your appointment panel.</p>
        {error && <p style={{ color: "var(--danger)", marginBottom: 16 }}>{error}</p>}
        <div className="glass" style={{ padding: 14, marginBottom: 18 }}>
          <p style={{ color: "var(--text-secondary)" }}>
            Total Patients Served:{" "}
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{totalPatients}</span>
          </p>
        </div>

        {/* tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "9px 20px",
                borderRadius: 50,
                border: "1px solid",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                background: tab === t.key ? "var(--accent)" : "transparent",
                borderColor: tab === t.key ? "var(--accent)" : "var(--border)",
                color: tab === t.key ? "#060910" : "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* pending tab */}
        {tab === "pending" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pending.length === 0 && (
              <div
                className="glass"
                style={{
                  padding: 40,
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                No pending appointments 🎉
              </div>
            )}
            {pending.map((a) => (
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
                <div>
                  <p style={{ fontWeight: 500 }}>{a.patientName}</p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {a.appointmentDate} at {a.appointmentTime?.slice(0, 5)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => updateStatus(a.id, "APPROVED")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,212,170,0.4)",
                      background: "rgba(0,212,170,0.1)",
                      color: "var(--accent)",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(a.id, "REJECTED")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,77,109,0.4)",
                      background: "rgba(255,77,109,0.1)",
                      color: "var(--danger)",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    <XCircle size={14} /> Reject
                  </button>
                  <button
                    onClick={() => updateStatus(a.id, "COMPLETED")}
                    className="btn-ghost"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* today tab */}
        {tab === "today" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {today.length === 0 && (
              <div
                className="glass"
                style={{
                  padding: 40,
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                No appointments scheduled for today.
              </div>
            )}
            {today.map((a) => (
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
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Calendar size={18} color="var(--accent)" />
                  <div>
                    <p style={{ fontWeight: 500 }}>{a.patientName}</p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      {a.appointmentTime?.slice(0, 5)}
                    </p>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        )}

        {/* completed tab */}
        {tab === "completed" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {completed.length === 0 && (
              <div className="glass" style={{ padding: 30, color: "var(--text-secondary)" }}>
                No completed appointments yet.
              </div>
            )}
            {completed.map((a) => (
              <div key={a.id} className="glass" style={{ padding: "16px 20px" }}>
                <p style={{ fontWeight: 600 }}>{a.patientName}</p>
                <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  {a.appointmentDate} · {a.appointmentTime?.slice(0, 5)}
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
