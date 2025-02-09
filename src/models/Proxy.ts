import mongoose from "mongoose";

const ProxySchema = new mongoose.Schema({
  ip: { type: String, required: true },
  port: { type: Number, required: true },
  username: { type: String },
  password: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Proxy", ProxySchema);
