import { Request, Response } from "express";
import Account from "../models/Account";
import { loginToTikTok } from "../utils/tiktokLogin";

// Add new TikTok account
export const addAccount = async (req: Request, res: Response) => {
  try {
    const { username, password, proxy } = req.body;
    const newAccount = new Account({ username, password, proxy, status: "pending" });
    await newAccount.save();
    res.status(201).json({ success: true, message: "Account added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding account" });
  }
};

// Get all accounts
export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching accounts" });
  }
};

export const loginAccount = async (req: any, res: any) => {
  const { accountId } = req.body;

  if (!accountId) {
    return res.status(400).json({ success: false, message: "Account ID is required" });
  }

  const result = await loginToTikTok(accountId);
  res.status(result.success ? 200 : 500).json(result);
};
