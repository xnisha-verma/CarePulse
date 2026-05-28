import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Calendar as CalendarIcon, FileText, X, Link as LinkIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [pending, setPending] = useState([]);
  const [today, setToday] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [tab, setTab] = useState("pending");
  const [error, setError] = useState("");
  const [rxModal, setRxModal] = useState(null); // appointment object
  const [rxText, setRxText] = useState("");
  const [rxSaving, setRxSaving] = useState(false);
  const [settings, setSettings] = useState({ hospitalName: "", experience: "", availableStartTime: "", availableEndTime: "", specialization: "" });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

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
    api.get("/doctors/my-profile").then(r => setSettings({
      hospitalName: r.data.hospitalName || "",
      experience: r.data.experience || "",
      availableStartTime: r.data.availableStartTime?.slice(0, 5) || "",
      availableEndTime: r.data.availableEndTime?.slice(0, 5) || "",
      specialization: r.data.specialization || ""
    })).catch(e => console.error("Failed to load settings", e));
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

  const openRxModal = (appt) => {
    setRxModal(appt);
    setRxText(appt.prescription || "");
  };

  const savePrescription = async () => {
    if (!rxModal || !rxText.trim()) return;
    setRxSaving(true);
    try {
      await api.put(`/appointments/${rxModal.id}/prescription`, { prescription: rxText });
      setRxModal(null);
      loadDashboard();
    } catch (e) {
      setError(e.message || "Failed to save prescription");
    } finally {
      setRxSaving(false);
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsMessage("");
    try {
      const payload = { ...settings };
      if (payload.availableStartTime && payload.availableStartTime.length === 5) payload.availableStartTime += ":00";
      if (payload.availableEndTime && payload.availableEndTime.length === 5) payload.availableEndTime += ":00";
      await api.put("/doctors/profile", payload);
      setSettingsMessage("Profile updated successfully!");
    } catch (err) {
      setSettingsMessage(err.message || "Failed to update profile");
    } finally {
      setSettingsSaving(false);
    }
  };

  const tabs = [
    { key: "pending", label: `Pending (${pending.length})` },
    { key: "today", label: `Today's Schedule (${today.length})` },
    { key: "completed", label: `Completed (${completed.length})` },
    { key: "calendar", label: `Calendar View 📅` },
    { key: "settings", label: `Settings ⚙️` },
  ];

  // Map appointments to react-big-calendar events
  const calendarEvents = appointments.map((appt) => {
    // appt.appointmentDate is YYYY-MM-DD
    // appt.appointmentTime is HH:mm:ss
    const start = new Date(`${appt.appointmentDate}T${appt.appointmentTime}`);
    const end = new Date(start.getTime() + 30 * 60000); // Assume 30 min slots
    return {
      title: `${appt.patientName} - ${appt.status}`,
      start,
      end,
      resource: appt,
    };
  });
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
          Welcome, {user?.name?.startsWith("Dr.") ? user.name : `Dr. ${user?.name || "Doctor"}`}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Here is your appointment panel.</p>
        {error && <p style={{ color: "var(--danger)", marginBottom: 16 }}>{error}</p>}
        <div style={{ padding: 16, marginBottom: 24, background: "#ffffff", borderRadius: 20, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.04)" }}>
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
                  background: "#ffffff",
                  borderRadius: 20,
                  boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.04)"
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
                  background: "#ffffff",
                  borderRadius: 20,
                  boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 36px -10px rgba(0,0,0,0.12)" }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(0,0,0,0.08)" }}
              >
                <div>
                  <p style={{ fontWeight: 500 }}>{a.patientName}</p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {a.appointmentDate} at {a.appointmentTime?.slice(0, 5)}
                  </p>
                  {a.medicalHistoryLink && (
                    <a href={a.medicalHistoryLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                      <LinkIcon size={12} /> View Medical History
                    </a>
                  )}
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
                  background: "#ffffff",
                  borderRadius: 20,
                  boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.04)"
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
                  background: "#ffffff",
                  borderRadius: 20,
                  boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 36px -10px rgba(0,0,0,0.12)" }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(0,0,0,0.08)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Calendar size={18} color="var(--accent)" />
                  <div>
                    <p style={{ fontWeight: 500 }}>{a.patientName}</p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      {a.appointmentTime?.slice(0, 5)}
                    </p>
                    {a.medicalHistoryLink && (
                      <a href={a.medicalHistoryLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                        <LinkIcon size={12} /> View Medical History
                      </a>
                    )}
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
              <div style={{ padding: 30, color: "var(--text-secondary)", background: "#ffffff", borderRadius: 20, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.04)" }}>
                No completed appointments yet.
              </div>
            )}
            {completed.map((a) => (
              <div key={a.id} style={{ padding: "20px 24px", background: "#ffffff", borderRadius: 20, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, transition: "all 0.2s" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 36px -10px rgba(0,0,0,0.12)" }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(0,0,0,0.08)" }}
              >
                <div>
                  <p style={{ fontWeight: 600 }}>{a.patientName}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    {a.appointmentDate} · {a.appointmentTime?.slice(0, 5)}
                  </p>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    <StatusBadge status={a.status} />
                    {a.prescription && <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, background: "#dcfce7", padding: "2px 8px", borderRadius: 50 }}>✓ Rx Added</span>}
                  </div>
                  {a.medicalHistoryLink && (
                    <a href={a.medicalHistoryLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                      <LinkIcon size={12} /> View Medical History
                    </a>
                  )}
                </div>
                <button
                  onClick={() => openRxModal(a)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 10,
                    border: a.prescription ? "1px solid rgba(79,70,229,0.3)" : "1px solid var(--border-accent)",
                    background: a.prescription ? "rgba(79,70,229,0.08)" : "var(--accent-dim)",
                    color: a.prescription ? "#4f46e5" : "var(--accent)",
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    transition: "all 0.2s"
                  }}
                >
                  <FileText size={14} /> {a.prescription ? "Edit Prescription" : "Write Prescription"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Prescription Modal */}
        {rxModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 24 }}
            onClick={() => setRxModal(null)}
          >
            <div
              style={{ background: "#ffffff", borderRadius: 24, padding: 32, maxWidth: 560, width: "100%", boxShadow: "0 30px 60px rgba(0,0,0,0.15)", position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setRxModal(null)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={20} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>Prescription</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>For {rxModal.patientName} · {rxModal.appointmentDate}</p>
                </div>
              </div>
              <textarea
                value={rxText}
                onChange={(e) => setRxText(e.target.value)}
                rows={8}
                placeholder="Write diagnosis, medications, dosage, follow-up notes..."
                style={{
                  width: "100%", padding: 16, borderRadius: 14,
                  border: "1px solid var(--border)", fontFamily: "var(--font-body)",
                  fontSize: 14, lineHeight: 1.7, resize: "vertical",
                  outline: "none", transition: "border-color 0.2s",
                  background: "#f9fafb"
                }}
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
                <button onClick={() => setRxModal(null)} className="btn-ghost" style={{ padding: "10px 20px" }}>Cancel</button>
                <button
                  onClick={savePrescription}
                  disabled={rxSaving || !rxText.trim()}
                  style={{
                    padding: "10px 24px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    color: "#ffffff", fontWeight: 700, fontSize: 14,
                    cursor: rxSaving || !rxText.trim() ? "not-allowed" : "pointer",
                    opacity: rxSaving || !rxText.trim() ? 0.6 : 1,
                    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
                    transition: "all 0.2s"
                  }}
                >
                  {rxSaving ? "Saving..." : "Save Prescription"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* calendar tab */}
        {tab === "calendar" && (
          <div
            className="glass"
            style={{
              padding: 24,
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.04)",
              height: 600
            }}
          >
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%", fontFamily: "var(--font-sans)" }}
              eventPropGetter={(event) => {
                let backgroundColor = "var(--accent)";
                if (event.resource.status === "PENDING") backgroundColor = "#f59e0b";
                if (event.resource.status === "REJECTED" || event.resource.status === "CANCELLED") backgroundColor = "var(--danger)";
                return { style: { backgroundColor, border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "12px" } };
              }}
            />
          </div>
        )}

        {/* settings tab */}
        {tab === "settings" && (
          <div className="glass" style={{ padding: 32, background: "#ffffff", borderRadius: 20, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.04)", maxWidth: 600 }}>
            <h2 style={{ fontFamily: "var(--font-display)", marginBottom: 24 }}>Profile Settings</h2>
            <form onSubmit={saveSettings} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--text-secondary)" }}>Hospital/Clinic Name</label>
                <input type="text" className="input" value={settings.hospitalName} onChange={e => setSettings({ ...settings, hospitalName: e.target.value })} required />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--text-secondary)" }}>Experience (Years)</label>
                  <input type="number" className="input" value={settings.experience} onChange={e => setSettings({ ...settings, experience: parseInt(e.target.value) || 0 })} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--text-secondary)" }}>Specialization</label>
                  <select className="input" value={settings.specialization} onChange={e => setSettings({ ...settings, specialization: e.target.value })} required>
                    <option value="">Select Specialization</option>
                    <option value="GENERAL_PHYSICIAN">General Physician</option>
                    <option value="CARDIOLOGIST">Cardiologist</option>
                    <option value="DERMATOLOGIST">Dermatologist</option>
                    <option value="PEDIATRICIAN">Pediatrician</option>
                    <option value="NEUROLOGIST">Neurologist</option>
                    <option value="ORTHOPEDIC">Orthopedic</option>
                    <option value="GYNECOLOGIST">Gynecologist</option>
                    <option value="DENTIST">Dentist</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--text-secondary)" }}>Available Start Time</label>
                  <input type="time" className="input" value={settings.availableStartTime} onChange={e => setSettings({ ...settings, availableStartTime: e.target.value })} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "var(--text-secondary)" }}>Available End Time</label>
                  <input type="time" className="input" value={settings.availableEndTime} onChange={e => setSettings({ ...settings, availableEndTime: e.target.value })} required />
                </div>
              </div>
              {settingsMessage && (
                <div style={{ padding: 12, borderRadius: 8, background: settingsMessage.includes("success") ? "rgba(0,212,170,0.1)" : "rgba(255,77,109,0.1)", color: settingsMessage.includes("success") ? "var(--accent)" : "var(--danger)", fontSize: 14, fontWeight: 500 }}>
                  {settingsMessage}
                </div>
              )}
              <button type="submit" className="btn-accent" style={{ alignSelf: "flex-start", marginTop: 8 }} disabled={settingsSaving}>
                {settingsSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
