import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/doctors/${id}`)
      .then((r) => setDoctor(r.data))
      .catch((e) => setError(e.message || "Failed to load doctor details"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Loading doctor details...</p>
        ) : error ? (
          <p style={{ color: "var(--danger)" }}>{error}</p>
        ) : (
          <div className="glass" style={{ padding: 30 }}>
            <h1 style={{ fontFamily: "var(--font-display)", marginBottom: 8 }}>
              {doctor.fullName}
            </h1>
            <p style={{ color: "var(--accent)", marginBottom: 12 }}>
              {doctor.specialization}
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
              {doctor.hospitalName} · {doctor.experience || 0} years experience
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
              Timings: {doctor.availableStartTime?.slice(0, 5)} -{" "}
              {doctor.availableEndTime?.slice(0, 5)}
            </p>
            <Link
              className="btn-accent"
              to={`/book/${doctor.id}`}
              style={{ textDecoration: "none" }}
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
