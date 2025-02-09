import express from "express";
import { addProxy } from "../controller/proxyController";

const router = express.Router();

router.post("/add", addProxy);

export default router;
