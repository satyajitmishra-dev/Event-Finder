const generateOtpEmail = (otp, name = 'User') => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f5;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
        }
        .header {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            padding: 40px 0;
            text-align: center;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 40px 40px;
            text-align: center;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 24px;
        }
        .message {
            color: #666;
            margin-bottom: 32px;
            font-size: 16px;
        }
        .otp-container {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            margin: 0 auto 32px;
            display: inline-block;
            border: 1px dashed #cbd5e1;
        }
        .otp-code {
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 36px;
            font-weight: 700;
            color: #4f46e5;
            letter-spacing: 8px;
            margin: 0;
        }
        .expiry {
            font-size: 14px;
            color: #94a3b8;
            margin-top: 16px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer-text {
            font-size: 12px;
            color: #94a3b8;
            margin: 8px 0;
        }
        .social-links {
            margin-top: 16px;
        }
        .social-link {
            display: inline-block;
            margin: 0 8px;
            color: #64748b;
            text-decoration: none;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>EventFinder</h1>
        </div>
        <div class="content">
            <h2 class="greeting">Hello, ${name} 👋</h2>
            <p class="message">
                Thank you for choosing EventFinder. To complete your verification, please use the One-Time Password (OTP) below.
            </p>
            
            <div class="otp-container">
                <div class="otp-code">${otp}</div>
            </div>

            <p class="message" style="font-size: 14px; margin-bottom: 0;">
                This code will expire in 5 minutes.<br>
                If you didn't request this, please ignore this email.
            </p>
        </div>
        <div class="footer">
            <p class="footer-text">
                © ${new Date().getFullYear()} EventFinder Inc. All rights reserved.
            </p>
            <p class="footer-text">
                123 Innovation Drive, Tech City, TC 90210
            </p>
            <div class="social-links">
                <a href="#" class="social-link">Privacy Policy</a> •
                <a href="#" class="social-link">Terms of Service</a> •
                <a href="#" class="social-link">Help Center</a>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = { generateOtpEmail };
