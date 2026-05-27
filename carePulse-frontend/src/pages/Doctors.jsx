/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import api from "../api/axios";

const SPECIALIZATIONS = [
  "ALL",
  "CARDIOLOGIST",
  "DENTIST",
  "NEUROLOGIST",
  "DERMATOLOGIST",
  "PEDIATRICIAN",
  "ORTHOPEDIC",
];

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("ALL");
  const [page, setPage] = useState(0);
  const [meta, setMeta] = useState({ totalPages: 0, totalElements: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("size", pageSize);
    if (search.trim()) params.set("search", search.trim());
    if (specialization !== "ALL") params.set("specialization", specialization);
    return params.toString();
  }, [page, pageSize, search, specialization]);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/doctors?${query}`)
      .then((r) => {
        setDoctors(r.data.content || []);
        setMeta({
          totalPages: r.data.totalPages || 0,
          totalElements: r.data.totalElements || 0,
        });
      })
      .catch((e) => setError(e.message || "Failed to load doctors"))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      <div className="page">
        <span className="label-tag">FIND A DOCTOR</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Browse Specialists
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
          Discover top specialists and book appointments with real-time availability.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              className="input"
              placeholder="Search doctor by name..."
              style={{ paddingLeft: 42 }}
              value={search}
              onChange={(e) => {
                setPage(0);
                setSearch(e.target.value);
              }}
            />
          </div>
          <select
            className="input"
            value={specialization}
            onChange={(e) => {
              setPage(0);
              setSpecialization(e.target.value);
            }}
          >
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All Specializations" : s}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p style={{ color: "var(--danger)", marginBottom: 16 }}>{error}</p>
        )}
        {loading ? (
          <p style={{ color: "var(--text-secondary)" }}>Loading doctors...</p>
        ) : (
          <>
            <p style={{ color: "var(--text-secondary)", marginBottom: 14 }}>
              {meta.totalElements} doctors found
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
              }}
            >
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <button
                className="btn-ghost"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Previous
              </button>
              <span style={{ color: "var(--text-secondary)", paddingTop: 10 }}>
                Page {page + 1} of {Math.max(1, meta.totalPages)}
              </span>
              <button
                className="btn-ghost"
                disabled={page + 1 >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
