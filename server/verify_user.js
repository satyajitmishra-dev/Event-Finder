const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const user = await User.findOne({ email: 'testuser@example.com' });
        if (user) {
            user.isVerified = true;
            await user.save();
            console.log('User manually verified!');
        } else {
            console.log('User not found.');
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
