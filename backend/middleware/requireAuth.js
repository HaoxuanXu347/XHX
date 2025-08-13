import { verifyAccess } from "../utils/jwt.js";

export default function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ error: "unauthorized" });

  try {
    const payload = verifyAccess(token); // { sub, role, iat, exp }
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "invalid or expired token" });
  }
}
