const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function listModelsRaw() {
    const key = process.env.GEMINI_API_KEY || process.env.OPENAI_KEY;
    if (!key) {
        console.error("❌ No API key found!");
        return;
    }

    console.log("Listing Models via Raw HTTP...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await axios.get(url);
        console.log("✅ SUCCESS! Available Models:");
        const models = response.data.models;
        if (models && models.length > 0) {
            models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found in response.");
        }
    } catch (error) {
        console.error("❌ FAILED to list models");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Error:", error.message);
        }
    }
}

listModelsRaw();
