import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Activity } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const dashboard =
    user?.role === "DOCTOR" ? "/doctor-dashboard" : "/dashboard";

  // Center navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Doctors", href: "/doctors" }
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(22, 58, 74, 0.06)",
        padding: "0 40px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(22, 58, 74, 0.03)"
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <Activity size={24} color="var(--accent)" strokeWidth={2.5} />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--text-primary)",
            letterSpacing: "-0.03em"
          }}
        >
          CarePulse
        </span>
      </Link>

      {/* Center Links - only show clearly on large screens, or keep simple for now */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {navLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            style={{
              textDecoration: "none",
              color: "var(--text-secondary)",
              fontWeight: 600,
              fontSize: 15,
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.color = "var(--accent)"}
            onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <Link
              to={dashboard}
              style={{
                textDecoration: "none",
                color: "var(--text-primary)",
                fontWeight: 600,
                marginRight: 12
              }}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="btn-accent"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px" }}
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link
            to="/register"
            className="btn-accent"
            style={{ textDecoration: "none" }}
          >
            Request Demo
          </Link>
        )}
      </div>
    </nav>
  );
}
