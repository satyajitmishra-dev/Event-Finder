const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { bio, interests, socialLinks, avatar } = req.body;
        let avatarUrl = avatar;

        if (req.file) {
            // Upload to Cloudinary
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'eventfinder/avatars',
            });
            avatarUrl = result.secure_url;
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.bio = bio || user.bio;
        user.interests = typeof interests === 'string' ? JSON.parse(interests) : (interests || user.interests);
        user.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : (socialLinks || user.socialLinks);
        user.avatar = avatarUrl || user.avatar;

        await user.save();

        const message = req.file
            ? 'Profile photo and details updated successfully ✨'
            : 'Profile details updated successfully ✨';

        res.status(200).json({ message, user });
    } catch (error) {
        console.error('Profile Update Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getProfile, updateProfile };
