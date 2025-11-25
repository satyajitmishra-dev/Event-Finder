const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function testRawHttp() {
    const key = process.env.GEMINI_API_KEY || process.env.OPENAI_KEY;
    if (!key) {
        console.error("❌ No API key found!");
        return;
    }

    console.log("Testing Raw HTTP Request to Google AI Studio...");
    console.log("Key prefix:", key.substring(0, 5));

    const models = [
        "gemini-1.5-flash",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const model of models) {
        console.log(`\n--- Testing Model: ${model} ---`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

        try {
            const response = await axios.post(url, {
                contents: [{
                    parts: [{ text: "Hello" }]
                }]
            });
            console.log("✅ SUCCESS!");
            console.log("Response:", JSON.stringify(response.data, null, 2));
            return;
        } catch (error) {
            console.error("❌ FAILED");
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", JSON.stringify(error.response.data, null, 2));
            } else {
                console.error("Error:", error.message);
            }
        }
    }
}

testRawHttp();
