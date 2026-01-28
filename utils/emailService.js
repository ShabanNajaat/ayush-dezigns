const nodemailer = require('nodemailer');

// Initialize Nodemailer transporter with Gmail SMTP
// Note: App Password is required for Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send order completion email to customer
 */
async function sendOrderCompletionEmail(order) {
    console.log(`[EmailService] Attempting to send Gmail SMTP completion email to: ${order.email} (Order #${order.id})`);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('[EmailService] ❌ Gmail SMTP credentials (EMAIL_USER/EMAIL_PASS) are missing.');
        return false;
    }

    try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #d4af37 0%, #8b4513 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; }
        .header p { margin: 10px 0 0; opacity: 0.9; font-style: italic; }
        .content { background: #ffffff; padding: 40px; }
        .greeting { font-size: 18px; color: #8b4513; font-weight: bold; margin-bottom: 20px; }
        .order-details { background: #fdfaf0; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #f1e4bc; }
        .order-details h3 { margin-top: 0; color: #8b4513; border-bottom: 2px solid #d4af37; padding-bottom: 10px; }
        .detail-row { padding: 12px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: bold; color: #666; width: 40%; }
        .detail-value { color: #333; width: 60%; text-align: right; }
        .next-steps { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .next-steps h3 { margin-top: 0; color: #333; }
        .contact-box { background: #fff; padding: 15px; border-radius: 6px; border-left: 4px solid #d4af37; margin-top: 15px; }
        .footer { text-align: center; padding: 30px; background: #f4f4f4; color: #777; font-size: 13px; }
        .social-notice { margin-top: 15px; color: #d4af37; font-weight: 500; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your Masterpiece is Ready! ✨</h1>
            <p>Ayush Dezigns - Luxury Tailoring</p>
        </div>
        <div class="content">
            <p class="greeting">Hello ${order.fullName},</p>
            
            <p>Your custom-designed creation has been meticulously finished and passed our final quality inspection. It's now ready for you to take home!</p>
            
            <div class="order-details">
                <h3>Order Snapshot</h3>
                <div class="detail-row">
                    <span class="detail-label">Order ID:</span>
                    <span class="detail-value">#${order.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Dress Type:</span>
                    <span class="detail-value">${order.dressType}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Occasion:</span>
                    <span class="detail-value">${order.occasion}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value" style="color: #28a745; font-weight: bold;">READY FOR PICKUP</span>
                </div>
            </div>
            
            <div class="next-steps">
                <h3>Collection Information</h3>
                <p>Please drop by our boutique or give us a call to arrange collection:</p>
                <div class="contact-box">
                    <p><strong>📞 Phone:</strong> 055 816 4043</p>
                    <p><strong>📍 Location:</strong> Sakumono, Accra, Ghana</p>
                </div>
            </div>
            
            <p>We're excited to see you in your new Ayush Dezigns piece!</p>
            
            <p>Warm regards,<br>
            <strong>The Ayush Dezigns Team</strong></p>
            
            <p class="social-notice">Follow us on TikTok & Instagram: @isotse_ayush</p>
        </div>
        <div class="footer">
            <p>&copy; 2026 Ayush Dezigns. All rights reserved.</p>
            <p>This is an automated notification regarding your custom order.</p>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"Ayush Dezigns" <${process.env.EMAIL_USER}>`,
            to: order.email,
            subject: `Ready for Pickup! 👗 Your Order #${order.id} is Complete`,
            html: emailHtml
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('[EmailService] ✅ Email sent successfully via Gmail SMTP. Message ID:', info.messageId);
        return true;
    } catch (error) {
        console.error('[EmailService] ❌ Gmail SMTP Error:', error);
        return false;
    }
}

module.exports = {
    sendOrderCompletionEmail
};
