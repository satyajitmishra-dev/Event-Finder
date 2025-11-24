const OpenAI = require('openai');
const User = require('../models/User');
const Event = require('../models/Event');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

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
    Be concise and friendly.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI Error:', error);
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
    
    Format the response as a JSON array of objects with keys: title, description, reason.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an event recommendation engine. Output valid JSON only." },
                { role: "user", content: prompt }
            ],
        });

        // Parse JSON from response
        let recommendations = [];
        try {
            recommendations = JSON.parse(completion.choices[0].message.content);
        } catch (e) {
            // Fallback if AI returns text
            recommendations = [{ title: "Check Dashboard", description: "Explore the dashboard for more events.", reason: "AI parsing failed." }];
        }

        res.json(recommendations);
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ message: 'Failed to get recommendations' });
    }
};
