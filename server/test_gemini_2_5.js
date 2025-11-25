const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

async function testGemini25() {
    const key = process.env.GEMINI_API_KEY || process.env.OPENAI_KEY;
    if (!key) {
        console.error("❌ No API key found!");
        return;
    }

    console.log("Testing gemini-2.5-flash...");
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    try {
        const result = await model.generateContent("Say 'It works!'");
        const response = await result.response;
        console.log("✅ SUCCESS! Response:", response.text());
    } catch (error) {
        console.error("❌ FAILED:", error.message);
    }
}

testGemini25();
