import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Mail, Lock } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.role, res.data.name, res.data.email);
      navigate(res.data.role === "DOCTOR" ? "/doctor-dashboard" : "/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "120px 24px 60px",
        background: "transparent",
      }}
    >
      <Navbar />
      <div
        style={{ 
          width: "100%", 
          maxWidth: 420, 
          padding: "48px 40px",
          background: "#ffffff",
          borderRadius: 24,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.05)"
        }}
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
            Welcome back
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              marginTop: 6,
            }}
          >
            Sign in to your account
          </p>
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
            {loading ? "Signing in..." : "Sign In"}
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
          No account?{" "}
          <Link
            to="/register"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
