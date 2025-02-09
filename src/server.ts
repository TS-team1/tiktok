import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes";
import commentRoutes from "./routes/commentRoutes";
import proxyRoutes from "./routes/proxyRoutes";

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://mohamedTarek:acM89HbtR2Jtdup0@cluster10.lggot.mongodb.net/birthdays?retryWrites=true&w=majority&appName=Cluster10")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/accounts", accountRoutes);
app.use("/comments", commentRoutes);
app.use("/proxies", proxyRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
