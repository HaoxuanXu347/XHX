import { useState } from "react";
import api from "../api/client";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", role: "tenant" });
  const [status, setStatus] = useState({ loading: false, error: "", ok: "" });

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", ok: "" });
    try {
      const res = await api.post("/api/users/register", form);
      setStatus({ loading: false, error: "", ok: `Created: ${res.data.email}` });
      setForm({ email: "", password: "", role: "tenant" });
    } catch (err) {
      const msg = err?.response?.data?.error || err.message;
      setStatus({ loading: false, error: msg, ok: "" });
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "32px auto" }}>
      <h2>Create Account</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Role</label><br />
          <select name="role" value={form.role} onChange={onChange}>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={status.loading}>
          {status.loading ? "Creating..." : "Register"}
        </button>
      </form>

      {status.error && <p style={{ color: "crimson" }}>{status.error}</p>}
      {status.ok && <p style={{ color: "green" }}>{status.ok}</p>}
    </div>
  );
}
