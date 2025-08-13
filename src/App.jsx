import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import React from "react";

function App() {
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const navStyle = {
    padding: "20px",
    backgroundColor: "#2c3e50",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: "200px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background 0.3s ease",
  };

  const linkHoverStyle = {
    backgroundColor: "#34495e",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f6f8",
  };

  return (
    <div style={layoutStyle}>
      {/* Sidebar Navigation */}
      <nav style={navStyle}>
        <NavLink to="/" style={linkStyle} hoverStyle={linkHoverStyle}>
          Home
        </NavLink>
        <NavLink to="/register" style={linkStyle} hoverStyle={linkHoverStyle}>
          Register
        </NavLink>
        <NavLink to="/login" style={linkStyle} hoverStyle={linkHoverStyle}>
          Login
        </NavLink>
      </nav>

      {/* Main Content */}
      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<h3 style={{ padding: 12 }}>404 Not Found</h3>}
          />
        </Routes>
      </div>
    </div>
  );
}

// Helper for hover effect
function NavLink({ to, children, style, hoverStyle }) {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={to}
      style={{
        ...style,
        ...(hover ? hoverStyle : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

export default App;
