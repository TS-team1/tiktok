import mongoose, { Schema, Document } from "mongoose";

interface IAccount extends Document {
  username: string;
  password: string;
  sessionCookies?: string;
  proxy?: {
    ip: string;
    port: number;
    username?: string;
    password?: string;
  };
  status: "active" | "banned" | "pending";
  createdAt: Date;
}

const AccountSchema = new Schema<IAccount>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessionCookies: { type: String },
  proxy: {
    ip: { type: String },
    port: { type: Number },
    username: { type: String },
    password: { type: String },
  },
  status: { type: String, enum: ["active", "banned", "pending"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAccount>("Account", AccountSchema);
