const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Helps prevent some TLS errors in cloud
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000,    // 5 seconds
            socketTimeout: 10000,     // 10 seconds
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        // In development, we might want to log the OTP if email fails
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[DEV] Failed to send email. Content: ${text}`);
        }
    }
};

module.exports = sendEmail;
