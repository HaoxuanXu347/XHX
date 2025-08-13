import { useState } from "react";
import api from "../api/client"; // axios instance with baseURL + withCredentials

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", ok: "" });
  const [me, setMe] = useState(null);

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", ok: "" });
    setMe(null);
    try {
      // 1) Login → sets HttpOnly cookies (access + refresh)
      await api.post("/api/auth/login", form); // cookies set by server; saved by browser

      // 2) Call a protected endpoint using the cookie
      const meRes = await api.get("/api/users/me");
      setMe(meRes.data);
      setStatus({ loading: false, error: "", ok: "Logged in" });
    } catch (err) {
      const msg = err?.response?.data?.error || err.message;
      setStatus({ loading: false, error: msg, ok: "" });
    }
  }

  async function handleRefresh() {
    try {
      await api.post("/api/auth/refresh");        // sets new cookies
      const meRes = await api.get("/api/users/me");
      setMe(meRes.data);
      setStatus({ loading: false, error: "", ok: "Access token refreshed" });
    } catch (err) {
      const msg = err?.response?.data?.error || err.message;
      setStatus({ loading: false, error: msg, ok: "" });
    }
  }
  
  async function handleLogout() {
    try {
      await api.post("/api/auth/logout");         // clears cookies
      setMe(null);
      setStatus({ loading: false, error: "", ok: "Logged out" });
    } catch (err) {
      const msg = err?.response?.data?.error || err.message;
      setStatus({ loading: false, error: msg, ok: "" });
    }
  }
  

  return (
    <div style={{ maxWidth: 420, margin: "32px auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br />
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br />
          <input name="password" type="password" value={form.password} onChange={onChange} required />
        </div>
        <button type="submit" disabled={status.loading}>
          {status.loading ? "Logging in..." : "Login"}
        </button>
      </form>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={handleRefresh}>Refresh token</button>
        <button onClick={handleLogout}>Logout</button>
        </div>

      {status.error && <p style={{ color: "crimson" }}>{status.error}</p>}
      {status.ok && <p style={{ color: "green" }}>{status.ok}</p>}

      {me && (
        <pre
          style={{
            background: "#f6f8fa",
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
            overflowX: "auto",
          }}
        >
{JSON.stringify(me, null, 2)}
        </pre>
      )}
    </div>
  );
}
