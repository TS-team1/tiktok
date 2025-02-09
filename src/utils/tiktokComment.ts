import puppeteer from "puppeteer";
import Account from "../models/Account";

// export const postComment = async (accountId: string, videoUrl: string, commentText: string) => {
//   try {
//     const account = await Account.findById(accountId);
//     if (!account || !account.sessionCookies) {
//       throw new Error("Account not found or not logged in");
//     }

//     const browser = await puppeteer.launch({ headless: false }); // Use headless: true for production
//     const page = await browser.newPage();

//     // Load session cookies
//     const cookies = JSON.parse(account.sessionCookies);
//     await page.setCookie(...cookies);

//     // Go to the TikTok video page
//     await page.goto(videoUrl, { waitUntil: "networkidle2" });

//     // Click the comment input box
//     await page.waitForSelector('div[data-e2e="comment-input"]', { visible: true });
//     await page.click('div[data-e2e="comment-input"]');

//     // Type the comment
//     await page.type('div[data-e2e="comment-input"]', commentText, { delay: 100 });

//     // Click the send button
//     await page.click('button[data-e2e="comment-post-button"]');

//     // Wait for a few seconds to confirm posting
//     await new Promise(resolve => setTimeout(resolve, 8000));

//     console.log(`Comment posted: "${commentText}" on ${videoUrl}`);

//     await browser.close();
//     return { success: true, message: "Comment posted successfully" };
//   } catch (error) {
//     console.error("Failed to post comment:", error);
//     return { success: false, message: "Comment posting failed" };
//   }
// };





export const postComment = async (accountId: string, videoUrl: string, commentText: string) => {
  const account = await Account.findById(accountId).populate("proxy");
  if (!account || !account.proxy) {
    console.log("No proxy assigned, cannot post comment.");
    return { success: false, message: "No proxy assigned." };
  }

  const { ip, port, username, password } = account.proxy;

  const browser = await puppeteer.launch({
    args: [
      `--proxy-server=${ip}:${port}`
    ],
    headless: false, // Change to true in production
  });

  const page = await browser.newPage();

  // If proxy requires authentication
  if (username && password) {
    await page.authenticate({ username, password });
  }

  try {
    await page.goto(videoUrl);
    await page.type("textarea", commentText);
    await page.click("button.post-comment");

    console.log(`Comment posted: "${commentText}" on ${videoUrl}`);

    await browser.close();
    return { success: true, message: "Comment posted successfully" };
  } catch (error) {
    console.error("Comment posting failed:", error);
    await browser.close();
    return { success: false, message: "Comment posting failed." };
  }
};
