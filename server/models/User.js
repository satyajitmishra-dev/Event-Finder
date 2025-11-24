const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    college: { type: String, required: true },
    stream: { type: String, required: true },
    yearOfStudying: { type: Number, required: true },
    location: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
