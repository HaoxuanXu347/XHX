/* eslint-env node */
import mongoose from "mongoose";

export default async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI missing");
  await mongoose.connect(uri, { autoIndex: true });
  console.log("✔ MongoDB connected");
}
