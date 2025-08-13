/* eslint-env node */
import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signAccess, signRefresh, verifyRefresh } from "../utils/jwt.js";

const router = Router();

// helper to set cookies with cross-site support (Cloud Run <-> Cloud Run)
function setAuthCookies(res, { access, refresh }) {
  const common = {
    httpOnly: true,
    secure: true,         // required for SameSite=None
    sameSite: "none",
    path: "/",
  };

  // 10 minutes for access (match your TTL)
  res.cookie("accessToken", access, { ...common, maxAge: 10 * 60 * 1000 });

  // 7 days for refresh (match your TTL)
  res.cookie("refreshToken", refresh, { ...common, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "missing email or password" });

    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    const payload = { sub: String(user._id), role: user.role };
    const access = signAccess(payload);
    const refresh = signRefresh(payload);

    setAuthCookies(res, { access, refresh });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

// POST /api/auth/refresh
router.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: "no refresh token" });

    const payload = verifyRefresh(token); // throws if invalid/expired
    const access = signAccess({ sub: payload.sub, role: payload.role });

    // rotate access only (keep existing refresh cookie)
    res.cookie("accessToken", access, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 10 * 60 * 1000,
    });

    return res.json({ ok: true });
  } catch {
    return res.status(401).json({ error: "invalid refresh token" });
  }
});

// POST /api/auth/logout
router.post("/logout", (_req, res) => {
  // clear cookies
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });
  return res.json({ ok: true });
});

export default router;
