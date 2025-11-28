const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Debug logging
    console.log('Attempting to send email...');
    console.log('User:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
    console.log('Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');

    // Check for credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('WARNING: Email credentials not found. Simulating email send.');
        // Simulate a delay to make it feel real
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.status(200).json({ message: 'Email sent successfully (Simulated)' });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self (admin)
            replyTo: email,
            subject: `EventFinder Contact: ${subject} from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Detailed Email Error:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

module.exports = router;
