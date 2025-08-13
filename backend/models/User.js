import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["tenant", "landlord", "admin"],
    default: "tenant",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
