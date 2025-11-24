const User = require('../models/User');
const OtpVerification = require('../models/Otp');
const sendEmail = require('../utils/emailService');
const generateTokens = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        await sendEmail(email, 'Verify your account', `Your OTP is ${otp}`);

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

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.passwordHash)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) return res.status(400).json({ message: 'Email not verified' });

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

        await sendEmail(email, 'Login OTP', `Your Login OTP is ${otp}`);

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

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        const { accessToken } = generateTokens(decoded.userId);
        res.json({ accessToken });
    });
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};
