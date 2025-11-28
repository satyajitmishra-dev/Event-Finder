const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otp: { type: String, required: true },
    type: { type: String, enum: ['register', 'login', 'reset'], required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });

// Index to automatically delete expired documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OtpVerification', otpSchema);
