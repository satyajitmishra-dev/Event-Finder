const axios = require('axios');

exports.getGlobalEvents = async (req, res) => {
    try {
        const { keyword, city } = req.query;
        const apiKey = process.env.EVENT_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: 'Ticketmaster API Key is missing' });
        }

        const params = {
            apikey: apiKey,
            keyword: keyword || '',
            city: city || '',
            sort: 'date,asc',
            size: 20,
        };

        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', { params });

        const events = response.data._embedded?.events?.map(event => ({
            _id: event.id,
            title: event.name,
            description: event.info || 'No description available.',
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            location: event._embedded?.venues?.[0]?.name || 'Unknown Venue',
            city: event._embedded?.venues?.[0]?.city?.name,
            category: event.classifications?.[0]?.segment?.name,
            registrationLink: event.url,
            imageUrl: event.images?.[0]?.url,
            isGlobal: true, // Flag to distinguish from local events
        })) || [];

        res.json(events);
    } catch (error) {
        console.error('Ticketmaster API Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch global events' });
    }
};
