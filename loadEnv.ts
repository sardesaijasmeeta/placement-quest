import dotenv from "dotenv";
dotenv.config();

console.log("Loaded key:", process.env.GEMINI_API_KEY || "❌ Not found");

