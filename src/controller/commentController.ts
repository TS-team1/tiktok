import { Request, Response } from "express";
import { postComment } from "../utils/tiktokComment";

export const commentOnVideo = async (req: any, res: any) => {
  const { accountId, videoUrl, commentText } = req.body;

  if (!accountId || !videoUrl || !commentText) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const result = await postComment(accountId, videoUrl, commentText);
  res.status(result.success ? 200 : 500).json(result);
};
