const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            html,
        });

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Email error:", error);
        if (process.env.NODE_ENV !== "production") {
            console.log("[DEV] Email content:", text || html);
        }
        throw error;
    }
};

module.exports = sendEmail;
