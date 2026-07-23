const key = process.env.INDEXNOW_KEY;
const siteUrl = process.env.PUBLIC_SITE_URL;
const urls = process.argv.slice(2);

if (!key || !siteUrl || urls.length === 0) {
  console.error("Usage: INDEXNOW_KEY=... PUBLIC_SITE_URL=https://example.com node scripts/submit-indexnow.mjs /page/");
  process.exit(1);
}

const host = new URL(siteUrl).host;
const urlList = urls.map((url) => new URL(url, siteUrl).toString());
if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) throw new Error("INDEXNOW_KEY must contain 8–128 letters, numbers, or hyphens");
if (urlList.some((url) => new URL(url).host !== host)) throw new Error("Every submitted URL must belong to PUBLIC_SITE_URL");
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${siteUrl.replace(/\/$/, "")}/${key}.txt`, urlList })
});

if (!response.ok) {
  throw new Error(`IndexNow request failed: ${response.status} ${response.statusText}`);
}

console.log(`Submitted ${urlList.length} URL(s) to IndexNow.`);
