const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            createdBy: req.user.userId,
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Events (with filters)
exports.getEvents = async (req, res) => {
    try {
        const { category, search, location } = req.query;
        let query = {};

        if (category) query.category = category;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        const events = await Event.find(query).populate('createdBy', 'name college').sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Event By ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name college');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get My Events
exports.getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ createdBy: req.user.userId }).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Join Event
exports.joinEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.attendees.includes(req.user.userId)) {
            return res.status(400).json({ message: 'Already joined' });
        }

        event.attendees.push(req.user.userId);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Leave Event
exports.leaveEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.attendees = event.attendees.filter(id => id.toString() !== req.user.userId);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Event.deleteOne({ _id: req.params.id });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
