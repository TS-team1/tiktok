import express from "express";
import { commentOnVideo } from "../controller/commentController";

const router = express.Router();

router.post("/post", commentOnVideo);

export default router;
