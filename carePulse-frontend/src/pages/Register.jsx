import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, User, Mail, Lock } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token, res.data.role, res.data.name, res.data.email);
      navigate(res.data.role === "DOCTOR" ? "/doctor-dashboard" : "/dashboard");
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(124,107,255,0.1) 0%, transparent 60%)",
      }}
    >
      <Navbar />
      <div
        className="glass"
        style={{ width: "100%", maxWidth: 440, padding: "40px 36px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Activity
            size={28}
            color="var(--accent)"
            style={{ marginBottom: 12 }}
          />
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              marginTop: 6,
            }}
          >
            Join CarePulse today
          </p>
        </div>

        {/* role toggle */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 10,
            padding: 4,
            marginBottom: 24,
          }}
        >
          {["PATIENT", "DOCTOR"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setForm({ ...form, role: r })}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 13,
                background: form.role === r ? "var(--accent)" : "transparent",
                color: form.role === r ? "#060910" : "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              {r === "PATIENT" ? "🧑 Patient" : "👨‍⚕️ Doctor"}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div>
            <label
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                marginBottom: 6,
                display: "block",
              }}
            >
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={15}
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
                placeholder="Nisha Verma"
                style={{ paddingLeft: 40 }}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                marginBottom: 6,
                display: "block",
              }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
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
                type="email"
                placeholder="you@example.com"
                style={{ paddingLeft: 40 }}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                marginBottom: 6,
                display: "block",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
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
                type="password"
                placeholder="••••••••"
                style={{ paddingLeft: 40 }}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          {error && (
            <p
              style={{
                color: "var(--danger)",
                fontSize: 13,
                background: "rgba(255,77,109,0.1)",
                padding: "10px 14px",
                borderRadius: 8,
              }}
            >
              {error}
            </p>
          )}

          <button
            className="btn-accent"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading
              ? "Creating account..."
              : `Create ${form.role === "DOCTOR" ? "Doctor" : "Patient"} Account`}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 14,
            color: "var(--text-secondary)",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
