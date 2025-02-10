
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import Account from "../models/Account";

puppeteer.use(StealthPlugin());

export const loginToTikTok = async (accountId: string) => {
  try {
    const account = await Account.findById(accountId);
    if (!account) throw new Error("Account not found");

    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    if (account.proxy) {
      await page.authenticate({
        username: account.proxy.username || "",
        password: account.proxy.password || "",
      });
    }

    await page.goto("https://www.tiktok.com/login/phone-or-email/email", {
      waitUntil: "networkidle2",
    });

    console.log("Waiting for username input...");
    await page.waitForSelector('input[name="username"]', { visible: true });

    console.log("Typing username...");
    await page.type('input[name="username"]', account.username, { delay: 100 });

    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', account.password, { delay: 100 });

    console.log("Clicking submit...");
    await page.click('button[type="submit"]');

    console.log("Checking login success...");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    // await page.waitForSelector('some-login-success-selector', { timeout: 1000 });

    // Save session cookies
    const cookies = await page.cookies();
    const postComment = async (accountId: string, videoUrl: string, commentText: string) => {
      try{
        const account = await Account.findById(accountId);
        if (!account || !account.sessionCookies) {
          throw new Error("Account not found or not logged in");
        }
        
        

      }catch(error){

      }
    };
    await Account.findByIdAndUpdate(accountId, {
      sessionCookies: JSON.stringify(cookies),
      status: "active",
    });

    console.log(`Login successful for ${account.username}`);
    await browser.close();
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Login failed" };
  }
};
