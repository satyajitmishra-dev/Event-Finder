const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/emailService');

router.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Debug logging
    console.log('Received contact form submission:');
    console.log('Body:', req.body);

    try {
        // 1. Send Notification to Admin
        // We send this TO the configured system email (MAIL_USER)
        // We include the user's email in the body so admin can reply manually if needed
        const adminSubject = `EventFinder Contact: ${subject} from ${name}`;
        const adminHtml = `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
        `;

        // 2. Send Auto-Reply to User
        const userSubject = `We've received your message: ${subject}`;
        const userHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">EventFinder</h1>
                    <p style="color: #e0e0e0; margin-top: 5px;">Connect with amazing experiences</p>
                </div>
                <div style="padding: 30px; color: #333333;">
                    <h2 style="color: #2d3748; margin-top: 0;">Hello ${name},</h2>
                    <p style="line-height: 1.6;">Thank you for reaching out to us! We have received your message regarding "<strong>${subject}</strong>".</p>
                    <p style="line-height: 1.6;">Our team is reviewing your inquiry and will get back to you as soon as possible, usually within 24 hours.</p>
                    
                    <div style="background-color: #f7fafc; border-left: 4px solid #764ba2; padding: 15px; margin: 20px 0;">
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${message}"</p>
                    </div>

                    <p style="line-height: 1.6;">In the meantime, feel free to browse more events on our platform.</p>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:5173" style="background-color: #764ba2; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Explore Events</a>
                    </div>
                </div>
                <div style="background-color: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #e0e0e0;">
                    <p>&copy; ${new Date().getFullYear()} EventFinder. All rights reserved.</p>
                    <p>This is an automated message, please do not reply directly to this email.</p>
                </div>
            </div>
        `;

        // Send emails using the shared utility
        // Note: sendEmail(to, subject, text, html)

        // Send to Admin (using process.env.MAIL_USER as destination too)
        // If MAIL_USER is not set, this might fail, but since OTP works, it should be set.
        if (process.env.MAIL_USER) {
            await sendEmail(process.env.MAIL_USER, adminSubject, 'New Contact Message', adminHtml);
        } else {
            console.warn('MAIL_USER not set, skipping admin notification');
        }

        // Send to User
        await sendEmail(email, userSubject, 'Thank you for contacting us', userHtml);

        console.log('Emails sent successfully (Admin & Auto-reply)');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Detailed Email Error:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

module.exports = router;
