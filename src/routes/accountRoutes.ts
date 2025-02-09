import express from "express";
import { addAccount, getAccounts, loginAccount } from "../controller/accountController";

const router = express.Router();

router.post("/add", addAccount);
router.get("/list", getAccounts);
router.post("/login", loginAccount);

export default router;
