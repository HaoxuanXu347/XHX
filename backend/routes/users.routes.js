import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// POST /api/users/register  (you already have this)
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email & password required" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, role });
    return res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "server error" });
  }
});

// GET /api/users/me  (protected)
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("email role createdAt");
  if (!user) return res.status(404).json({ error: "not found" });
  res.json(user);
});

export default router;

