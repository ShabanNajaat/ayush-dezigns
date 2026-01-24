const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send order completion email to customer via Resend API
 */
async function sendOrderCompletionEmail(order) {
    console.log(`[EmailService] Attempting to send Resend completion email to: ${order.email} (Order #${order.id})`);

    if (!process.env.RESEND_API_KEY) {
        console.error('[EmailService] ❌ RESEND_API_KEY is missing.');
        return false;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Ayush Dezigns <orders@ayushdezigns.com>', // MUST BE A VERIFIED DOMAIN ON RESEND
            to: [order.email],
            subject: `Ready for Pickup! 👗 Your Order #${order.id} is Complete`,
            html: `
                <!DOCTYPE html>
                <html>
                <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                        <div style="background: #8b4513; color: white; padding: 20px; text-align: center;">
                            <h1>Ayush Dezigns</h1>
                        </div>
                        <div style="padding: 20px;">
                            <h2>Hello ${order.fullName},</h2>
                            <p>Great news! Your custom order is ready for pickup.</p>
                            <div style="background: #fdfaf0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <p><strong>Order ID:</strong> #${order.id}</p>
                                <p><strong>Dress Type:</strong> ${order.dressType}</p>
                                <p><strong>Occasion:</strong> ${order.occasion}</p>
                            </div>
                            <p>Please visit our boutique at Sakumono, Accra to collect your piece.</p>
                            <p>Warm regards,<br>The Ayush Dezigns Team</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        if (error) {
            console.error('[EmailService] ❌ Resend API Error:', error);
            return false;
        }

        console.log('[EmailService] ✅ Email sent successfully via Resend:', data.id);
        return true;
    } catch (err) {
        console.error('[EmailService] 💥 Unexpected Error:', err);
        return false;
    }
}

module.exports = {
    sendOrderCompletionEmail
};
