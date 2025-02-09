import { Request, Response } from "express";
import Proxy from "../models/Proxy";

export const addProxy = async (req: any, res: any) => {
  const { ip, port, username, password } = req.body;

  if (!ip || !port) {
    return res.status(400).json({ success: false, message: "Missing IP or port" });
  }

  try {
    const newProxy = await Proxy.create({ ip, port, username, password });
    res.status(201).json({ success: true, proxy: newProxy });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add proxy" });
  }
};
