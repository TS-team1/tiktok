import puppeteer from "puppeteer";
import Account from "../models/Account";

export const loginToTikTok = async (accountId: string) => {
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    if (account.proxy) {
      await page.authenticate({
        username: account.proxy.username || "",
        password: account.proxy.password || "",
      });
    }

    await page.goto("https://www.tiktok.com/login/phone-or-email/email", { waitUntil: "networkidle2" });

    console.log('Waiting for username input...');
    await page.waitForSelector('input[name="username"]', { visible: true });
    console.log('Typing username...');
    await page.type('input[name="username"]', account.username, { delay: 100 });


    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', account.password, { delay: 100 });
      
    console.log('Clicking submit...');
    await page.click('button[type="submit"]');
    
    console.log('Waiting for navigation...');
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Save session cookies
    const cookies = await page.cookies();
    await Account.findByIdAndUpdate(accountId, { sessionCookies: JSON.stringify(cookies), status: "active" });

    console.log(`Login successful for ${account.username}`);

    await browser.close();
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Login failed" };
  }
};



(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Headless false to see the page
    const page = await browser.newPage();

    await page.goto('https://www.tiktok.com/login/phone-or-email/email', { waitUntil: 'networkidle2' });

    // Wait for input fields to load
    await page.waitForSelector('input', { timeout: 5000 });

    // Extract input names, IDs, and placeholders
    const inputDetails = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input')).map(input => ({
            name: input.name,
            id: input.id,
            placeholder: input.placeholder,
            class: input.className
        }));
    });

    console.log('Input Details:', inputDetails);

    await browser.close();
})();
