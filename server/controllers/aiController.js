const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require('../models/User');
const Event = require('../models/Event');

// Initialize Gemini
// Fallback to OPENAI_KEY if GEMINI_API_KEY is not set, as user might have stored it there
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.OPENAI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.chat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.userId;

        // Fetch user context
        const user = await User.findById(userId).select('name location interests');

        // System prompt to give persona
        const systemPrompt = `You are EventFinder AI, a helpful assistant for discovering events. 
    The user is ${user.name} located in ${user.location}.
    Help them find events, answer questions about local activities, or suggest things to do.
    Be concise and friendly.
    
    User message: ${message}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('Gemini Error:', error);
        res.status(500).json({ message: 'Failed to get AI response' });
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        // Fetch some local events to feed into context
        const localEvents = await Event.find({ location: { $regex: user.location, $options: 'i' } }).limit(5);
        const eventTitles = localEvents.map(e => e.title).join(', ');

        const prompt = `Suggest 3 types of events for a student named ${user.name} 
    studying ${user.stream} at ${user.college} in ${user.location}.
    
    Here are some actual events happening nearby: ${eventTitles}.
    
    Format the response as a valid JSON array of objects with keys: title, description, reason.
    Do not include any markdown formatting or code blocks. Just the raw JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse JSON from response
        let recommendations = [];
        try {
            recommendations = JSON.parse(text);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            // Fallback if AI returns text
            recommendations = [{ title: "Check Dashboard", description: "Explore the dashboard for more events.", reason: "AI parsing failed." }];
        }

        res.json(recommendations);
    } catch (error) {
        console.error('Gemini Error:', error);
        res.status(500).json({ message: 'Failed to get recommendations' });
    }
};
