const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();

const sampleEvents = [
    {
        title: "Tech Innovation Summit 2024",
        description: "Join industry leaders to discuss the future of AI, Blockchain, and IoT. A full day of keynotes, panels, and networking opportunities.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: "09:00 AM",
        mode: "offline",
        location: "Convention Center, City Tech Park",
        college: "City University",
        category: "Technology",
        tags: ["AI", "Innovation", "Networking"],
        isPublic: true
    },
    {
        title: "Web Development Workshop",
        description: "Hands-on workshop on building modern web applications with React and Node.js. Beginners welcome!",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        time: "02:00 PM",
        mode: "online",
        location: "Zoom (Link will be sent after registration)",
        college: "Tech Institute",
        category: "Workshop",
        tags: ["Coding", "React", "Web Dev"],
        isPublic: true
    },
    {
        title: "Annual Cultural Fest - 'Vibrance'",
        description: "A celebration of music, dance, and art. Featuring performances by top college bands and dance troupes.",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        time: "05:00 PM",
        mode: "offline",
        location: "University Auditorium",
        college: "State University",
        category: "Cultural",
        tags: ["Music", "Dance", "Festival"],
        isPublic: true
    },
    {
        title: "Startup Pitch Night",
        description: "Watch aspiring entrepreneurs pitch their ideas to a panel of investors. Great opportunity to learn about the startup ecosystem.",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        time: "06:30 PM",
        mode: "offline",
        location: "Innovation Hub, Downtown",
        college: "Business School",
        category: "Business",
        tags: ["Startup", "Entrepreneurship", "Pitch"],
        isPublic: true
    },
    {
        title: "Machine Learning Bootcamp",
        description: "Intensive 2-day bootcamp covering the basics of ML algorithms and Python implementation.",
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        time: "10:00 AM",
        mode: "online",
        location: "Google Meet",
        college: "Engineering College",
        category: "Education",
        tags: ["ML", "Python", "Data Science"],
        isPublic: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventfinder');
        console.log('MongoDB Connected');

        // Find a user to assign as creator (or create a dummy one)
        let creator = await User.findOne();
        if (!creator) {
            console.log('No users found. Creating a dummy admin user...');
            // Create a dummy user if none exists (simplified for seeding)
            // In a real scenario, we'd hash password etc, but let's assume at least one user exists or we skip
            // Actually, let's just create one properly if needed or fail gracefully.
            // For now, let's assume the user has registered at least one user as per previous context.
            // If not, we can't easily create one without bcrypt etc here easily unless we import it.
            // Let's import bcrypt just in case.
            const bcrypt = require('bcrypt');
            const passwordHash = await bcrypt.hash('password123', 10);
            creator = await User.create({
                name: "Admin Seeder",
                email: "admin@eventfinder.com",
                passwordHash,
                location: "Internet",
                isVerified: true
            });
        }

        console.log(`Assigning events to user: ${creator.name} (${creator._id})`);

        const eventsWithCreator = sampleEvents.map(event => ({
            ...event,
            createdBy: creator._id
        }));

        await Event.insertMany(eventsWithCreator);
        console.log('Events Seeded Successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
