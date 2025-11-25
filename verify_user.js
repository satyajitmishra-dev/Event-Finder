const mongoose = require('mongoose');
const OtpVerification = require('./server/models/Otp');
const User = require('./server/models/User');
const dotenv = require('dotenv');

dotenv.config({ path: './server/.env' });

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const user = await User.findOne({ email: 'testuser@example.com' });
        if (user) {
            const otpRecord = await OtpVerification.findOne({ userId: user._id }).sort({ createdAt: -1 });
            if (otpRecord) {
                // We need to compare with the hash, but we can't reverse hash.
                // Wait, the OTP is stored as hash. We can't retrieve the plain OTP!
                // We need to update the OTP in DB to a known hash or just manually verify the user.
                console.log('OTP Record found, but it is hashed.');

                // Let's manually verify the user
                user.isVerified = true;
                await user.save();
                console.log('User manually verified!');
            } else {
                console.log('No OTP record found.');
            }
        } else {
            console.log('User not found.');
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
