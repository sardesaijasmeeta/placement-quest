import dotenv from "dotenv";
dotenv.config();

const key = process.env.GEMINI_API_KEY!;
const model = "models/gemini-2.5-flash";

async function ping(base: string) {
  const url = `${base}/models/${model}?key=${key}`;
  const r = await fetch(url);
  console.log(`${base} -> ${r.status} ${r.statusText}`);
  if (r.ok) console.log(await r.text());
}

(async () => {
  await ping("https://generativelanguage.googleapis.com/v1beta");
  await ping("https://generativelanguage.googleapis.com/v1beta2");
  await ping("https://generativelanguage.googleapis.com/v1");
})();
