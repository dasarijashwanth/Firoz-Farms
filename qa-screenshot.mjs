import { chromium } from "playwright";

const urls = process.argv.slice(2);
const browser = await chromium.launch();

for (const url of urls) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("response", (res) => {
    if (res.status() >= 400) errors.push(`HTTP ${res.status()} on ${res.url()}`);
  });

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
    const name = url.replace(/https?:\/\//, "").replace(/[^a-z0-9]+/gi, "_");
    await page.screenshot({ path: `qa-${name}.png`, fullPage: true });
    console.log(`\n=== ${url} ===`);
    console.log("ERRORS:", errors.length ? JSON.stringify(errors, null, 2) : "none");
  } catch (e) {
    console.log(`\n=== ${url} ===`);
    console.log("FAILED TO LOAD:", String(e));
  }
  await page.close();
}

await browser.close();
