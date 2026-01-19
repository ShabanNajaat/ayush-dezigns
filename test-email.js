require('dotenv').config();
const { sendOrderCompletionEmail } = require('./utils/emailService');

const dummyOrder = {
    id: 'TEST12345',
    fullName: 'Test Customer',
    email: process.env.EMAIL_USER, // Send to yourself for testing
    dressType: 'Test Silk Dress',
    occasion: 'Test Party'
};

console.log('--- Email Test Script ---');
console.log('Sending test email to:', dummyOrder.email);

sendOrderCompletionEmail(dummyOrder)
    .then(success => {
        if (success) {
            console.log('✅ SUCCESS: Test email sent! Check your inbox.');
        } else {
            console.log('❌ FAILED: Check the error logs above.');
        }
        process.exit(0);
    })
    .catch(err => {
        console.error('💥 FATAL ERROR:', err);
        process.exit(1);
    });
