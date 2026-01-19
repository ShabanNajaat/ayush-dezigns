const { Resend } = require('resend');

// Initialize Resend with API key from environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Send order completion email to customer
 */
async function sendOrderCompletionEmail(order) {
    if (!resend) {
        console.log('Resend not configured - email not sent');
        return false;
    }

    try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4af37 0%, #8b4513 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #8b4513; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #d4af37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Your Custom Dress is Ready!</h1>
            <p>Ayush Dezigns</p>
        </div>
        <div class="content">
            <p>Dear ${order.fullName},</p>
            
            <p>Great news! Your custom dress has been completed and is ready for pickup.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Order ID:</span> #${order.id}
                </div>
                <div class="detail-row">
                    <span class="detail-label">Dress Type:</span> ${order.dressType}
                </div>
                <div class="detail-row">
                    <span class="detail-label">Occasion:</span> ${order.occasion}
                </div>
                <div class="detail-row">
                    <span class="detail-label">Fabric:</span> ${order.fabric}
                </div>
                <div class="detail-row">
                    <span class="detail-label">Colors:</span> ${order.colors}
                </div>
            </div>
            
            <h3>Next Steps:</h3>
            <p>Please contact us to arrange pickup or delivery:</p>
            <ul>
                <li><strong>Phone:</strong> 055 816 4043</li>
                <li><strong>Location:</strong> Sakumono, Accra, Ghana</li>
            </ul>
            
            <p>We can't wait for you to see your beautiful custom dress!</p>
            
            <p>Thank you for choosing Ayush Dezigns.</p>
            
            <p>Best regards,<br>
            <strong>Ayush Dezigns Team</strong></p>
        </div>
        <div class="footer">
            <p>Ayush Dezigns - Premium Custom Fashion Boutique</p>
            <p>Sakumono, Accra, Ghana | 055 816 4043</p>
        </div>
    </div>
</body>
</html>
        `;

        const { data, error } = await resend.emails.send({
            from: 'Ayush Dezigns <onboarding@resend.dev>',
            to: [order.email],
            subject: `Your Custom Dress is Ready! 🎉 - Order #${order.id}`,
            html: emailHtml,
        });

        if (error) {
            console.error('Error sending email:', error);
            return false;
        }

        console.log('Email sent successfully:', data);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = {
    sendOrderCompletionEmail
};
