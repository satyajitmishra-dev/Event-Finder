const sgMail = require("@sendgrid/mail");

const sendEmail = async (to, subject, text, html) => {
    try {
        // Use SendGrid API key from environment
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to,
            from: process.env.MAIL_USER, // Must be verified sender in SendGrid
            subject,
            text,
            html,
        };

        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Email error:", error);
        if (error.response) {
            console.error("SendGrid error details:", error.response.body);
        }
        if (process.env.NODE_ENV !== "production") {
            console.log("[DEV] Email content:", text || html);
        }
        throw error;
    }
};

module.exports = sendEmail;
