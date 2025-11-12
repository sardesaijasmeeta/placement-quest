import dotenv from "dotenv";
dotenv.config();

const key = process.env.GEMINI_API_KEY!;
const url = "https://generativelanguage.googleapis.com/v1beta/models";

fetch(`${url}?key=${key}`)
  .then((r) => r.json())
  .then((j) => console.log(JSON.stringify(j, null, 2)))
  .catch(console.error);
