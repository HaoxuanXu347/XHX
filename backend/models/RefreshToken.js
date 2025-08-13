import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    token: { type: String, unique: true },      // we'll store a token id (jti)
    revoked: { type: Boolean, default: false },
    expiresAt: { type: Date, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("RefreshToken", refreshTokenSchema);
