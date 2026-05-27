/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function AppointmentBooking() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/doctors/${doctorId}`)
      .then((r) => setDoctor(r.data))
      .catch((e) => setError(e.message || "Failed to load doctor"));
  }, [doctorId]);

  // Generate time options based on doctor's available hours
  const timeOptions = [];
  if (doctor) {
    const startHour = parseInt(doctor.availableStartTime?.slice(0, 2) || "9");
    const endHour = parseInt(doctor.availableEndTime?.slice(0, 2) || "17");
    for (let h = startHour; h < endHour; h++) {
      timeOptions.push(`${String(h).padStart(2, "0")}:00`);
      timeOptions.push(`${String(h).padStart(2, "0")}:30`);
    }
  }

  const canBook = date && time;

  const book = async () => {
    if (!canBook) return;
    setError("");
    setLoading(true);
    try {
      await api.post("/appointments", {
        doctorId: parseInt(doctorId),
        appointmentDate: date,
        appointmentTime: time + ":00",
        notes,
      });
      setSuccess("Appointment booked successfully! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (e) {
      setError(e.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        <span className="label-tag">BOOK APPOINTMENT</span>
        <h1 style={{ fontFamily: "var(--font-display)", marginBottom: 12 }}>
          {doctor ? `Book with ${doctor.fullName}` : "Appointment Booking"}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
          Select a date and time to book your appointment.
        </p>

        <div className="glass" style={{ padding: 24, maxWidth: 720 }}>
          {/* Date Picker */}
          <label style={{ display: "block", marginBottom: 8, color: "var(--text-secondary)" }}>
            Select Date
          </label>
          <input
            type="date"
            className="input"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Time Picker */}
          <p style={{ marginTop: 16, marginBottom: 8, color: "var(--text-secondary)" }}>
            Select Time
          </p>
          {doctor && timeOptions.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {timeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: time === t ? "var(--accent)" : "transparent",
                    color: time === t ? "#061117" : "var(--text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>Loading available times...</p>
          )}

          {/* Notes */}
          <label
            style={{ display: "block", marginTop: 18, marginBottom: 8, color: "var(--text-secondary)" }}
          >
            Notes (optional)
          </label>
          <textarea
            className="input"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes for the doctor..."
          />

          {error && <p style={{ color: "var(--danger)", marginTop: 12 }}>{error}</p>}
          {success && <p style={{ color: "var(--accent)", marginTop: 12 }}>✓ {success}</p>}

          <button
            className="btn-accent"
            onClick={book}
            disabled={!canBook || loading}
            style={{ marginTop: 16, opacity: canBook && !loading ? 1 : 0.6 }}
          >
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}
