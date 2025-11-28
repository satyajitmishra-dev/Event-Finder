const User = require('../models/User');
const OtpVerification = require('../models/Otp');
const sendEmail = require('../utils/emailService');
const generateTokens = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOtpEmail } = require('../utils/emailTemplates');

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, college, stream, yearOfStudying, location } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, passwordHash, college, stream, yearOfStudying, location
        });
        await newUser.save();

        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        await new OtpVerification({
            userId: newUser._id,
            otp: hashedOtp,
            type: 'register',
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
        }).save();

        const emailHtml = generateOtpEmail(otp, name);
        await sendEmail(email, 'Verify your account - EventFinder', `Your OTP is ${otp}`, emailHtml);

        res.status(201).json({ message: 'OTP sent to email', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Register OTP
exports.verifyRegisterOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const record = await OtpVerification.findOne({ userId, type: 'register' });
        if (!record) return res.status(400).json({ message: 'OTP not found or expired' });

        const isValid = await bcrypt.compare(otp, record.otp);
        if (!isValid) return res.status(400).json({ message: 'Invalid OTP' });

        await User.findByIdAndUpdate(userId, { isVerified: true });
        await OtpVerification.deleteOne({ _id: record._id });

        res.status(200).json({ message: 'Hooray!! Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' }); // Or "Wrong password" if preferred, but "Invalid credentials" is safer. User asked for "Wrong password" or "User exist or not".
        }

        if (user.isVerified) {
            // Remove old login OTPs
            await OtpVerification.deleteMany({ userId: user._id, type: 'login' });

            const { accessToken, refreshToken } = generateTokens(user._id);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            const userResponse = await User.findById(user._id).select('-passwordHash');
            return res.status(200).json({ accessToken, user: userResponse });
        }

        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Remove old login OTPs
        await OtpVerification.deleteMany({ userId: user._id, type: 'login' });

        await new OtpVerification({
            userId: user._id,
            otp: hashedOtp,
            type: 'login',
            expiresAt: Date.now() + 5 * 60 * 1000,
        }).save();

        const emailHtml = generateOtpEmail(otp, user.name);
        await sendEmail(email, 'Login Verification - EventFinder', `Here is Your Login OTP: ${otp}`, emailHtml);

        res.status(200).json({ message: 'OTP sent', userId: user._id, status: 'OTP_SENT' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Login OTP
exports.verifyLoginOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const record = await OtpVerification.findOne({ userId, type: 'login' });
        if (!record) return res.status(400).json({ message: 'OTP not found or expired' });

        const isValid = await bcrypt.compare(otp, record.otp);
        if (!isValid) return res.status(400).json({ message: 'Invalid OTP' });

        await OtpVerification.deleteOne({ _id: record._id });

        const { accessToken, refreshToken } = generateTokens(userId);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const user = await User.findById(userId).select('-passwordHash');
        res.status(200).json({ accessToken, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Refresh Token
exports.refresh = async (req, res) => {
    const token = req.cookies?.refreshToken; // Requires cookie-parser
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        try {
            const { accessToken } = generateTokens(decoded.userId);
            const user = await User.findById(decoded.userId).select('-passwordHash');

            if (!user) return res.status(404).json({ message: 'User not found' });

            res.json({ accessToken, user });
        } catch (error) {
            res.status(500).json({ message: 'Server error during refresh' });
        }
    });
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.passwordHash = passwordHash;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        await OtpVerification.deleteMany({ userId: user._id, type: 'reset' });

        await new OtpVerification({
            userId: user._id,
            otp: hashedOtp,
            type: 'reset',
            expiresAt: Date.now() + 10 * 60 * 1000, // 10 mins
        }).save();

        // DEV: Log OTP to file
        if (process.env.NODE_ENV !== 'production') {
            require('fs').writeFileSync('otp.txt', otp);
        }

        const emailHtml = generateOtpEmail(otp, user.name);
        await sendEmail(email, 'Reset Password OTP - EventFinder', `Your Reset Password OTP is ${otp}`, emailHtml);

        res.status(200).json({ message: 'OTP sent to email', userId: user._id });
    } catch (error) {
        // DEV: Log error to file
        require('fs').writeFileSync('server_error.log', error.message + '\n' + error.stack);
        res.status(500).json({ message: error.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { userId, otp, newPassword } = req.body;

        const record = await OtpVerification.findOne({ userId, type: 'reset' });
        if (!record) return res.status(400).json({ message: 'OTP not found or expired' });

        const isValid = await bcrypt.compare(otp, record.otp);
        if (!isValid) return res.status(400).json({ message: 'Invalid OTP' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.passwordHash = passwordHash;
        await user.save();

        await OtpVerification.deleteOne({ _id: record._id });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
    try {
        const { userId, type } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate new OTP
        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Delete existing OTPs of this type
        await OtpVerification.deleteMany({ userId: user._id, type });

        // Save new OTP
        await new OtpVerification({
            userId: user._id,
            otp: hashedOtp,
            type,
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
        }).save();

        // Send email
        const emailHtml = generateOtpEmail(otp, user.name);
        await sendEmail(user.email, 'Resend OTP - EventFinder', `Your new OTP is ${otp}`, emailHtml);

        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
