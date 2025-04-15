// api/send-inquiry.js
const https = require('https');

// Vercel Serverless Function
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS requests for CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        console.log(`Method ${req.method} not allowed, only POST is accepted`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse the request body if it's a string
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.error('Invalid JSON in request body', e);
                return res.status(400).json({ error: 'Invalid JSON in request body' });
            }
        }

        // Check if body exists and is not empty
        if (!body || Object.keys(body).length === 0) {
            console.log('Empty request body received');
            return res.status(400).json({ error: 'Nema podataka u zahtevu.' });
        }

        const {
            name,
            email,
            phone,
            message,
            productId,
            productName,
            productCode,
            quantity
        } = body;

        console.log('Received inquiry data:', { name, email, phone, productName, productCode });

        // Validate required fields
        if (!name || !email || !phone || !message || !productName || !productCode) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Svi potrebni podaci moraju biti popunjeni.' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Validation failed: Invalid email format');
            return res.status(400).json({ error: 'Email adresa nije ispravna.' });
        }

        // Sanitize input data
        const safeProductName = productName ? String(productName).replace(/[<>]/g, '') : 'Unknown';
        const safeProductCode = productCode ? String(productCode).replace(/[<>]/g, '') : 'Unknown';
        const safeQuantity = quantity ? String(quantity).replace(/[<>]/g, '') : '1';
        const safeName = name ? String(name).replace(/[<>]/g, '') : 'Unknown';
        const safeEmail = email ? String(email).replace(/[<>]/g, '') : 'Unknown';
        const safePhone = phone ? String(phone).replace(/[<>]/g, '') : 'Unknown';
        const safeMessage = message ? String(message).replace(/[<>]/g, '') : 'No message';

        // Log the inquiry to console (will be visible in Vercel logs)
        console.log('INQUIRY RECEIVED:');
        console.log('---------------------');
        console.log(`Product: ${safeProductName} (${safeProductCode})`);
        console.log(`Quantity: ${safeQuantity}`);
        console.log(`Customer: ${safeName}`);
        console.log(`Email: ${safeEmail}`);
        console.log(`Phone: ${safePhone}`);
        console.log(`Message: ${safeMessage}`);
        console.log('---------------------');

        // Optional: Send to webhook if WEBHOOK_URL is defined in environment variables
        if (process.env.WEBHOOK_URL) {
            try {
                // Format the message for webhook (e.g., Discord, Slack, etc.)
                const webhookData = {
                    content: `**Nova kontakt poruka sa web sajta**`,
                    embeds: [{
                        title: `Upit za proizvod: ${safeProductName} (${safeProductCode})`,
                        color: 16766720, // Amber color
                        fields: [
                            { name: "Ime i prezime", value: safeName, inline: true },
                            { name: "Email", value: safeEmail, inline: true },
                            { name: "Telefon", value: safePhone, inline: true },
                            { name: "Proizvod", value: safeProductName, inline: true },
                            { name: "Šifra", value: safeProductCode, inline: true },
                            { name: "Količina", value: `${safeQuantity} m²`, inline: true },
                            { name: "Poruka", value: safeMessage }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                };

                // Send to webhook
                await sendToWebhook(process.env.WEBHOOK_URL, webhookData);
                console.log('Successfully sent to webhook');
            } catch (webhookError) {
                console.error('Error sending to webhook:', webhookError);
                // We don't return an error to the client if the webhook fails
            }
        } else {
            console.log('No webhook URL configured - only logging to console');
        }

        // Return success
        return res.status(200).json({
            success: true,
            message: 'Vaš upit je uspešno poslat.'
        });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            error: 'Dogodila se greška prilikom slanja upita. Molimo pokušajte ponovo kasnije ili nas kontaktirajte telefonom.'
        });
    }
};

// Helper function to send data to a webhook
async function sendToWebhook(webhookUrl, data) {
    return new Promise((resolve, reject) => {
        // Parse the webhook URL
        const urlObj = new URL(webhookUrl);

        // Create the request options
        const options = {
            hostname: urlObj.hostname,
            port: 443,
            path: urlObj.pathname + urlObj.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        // Create and send the request
        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(responseData);
                } else {
                    reject(new Error(`Webhook request failed with status code ${res.statusCode}: ${responseData}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        // Send the data
        req.write(JSON.stringify(data));
        req.end();
    });
}