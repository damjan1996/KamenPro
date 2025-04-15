// api/send-inquiry.js
import fetch from 'node-fetch';

// Vercel Serverless Function
export default async function handler(req, res) {
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

        // Use fetch to send directly to Brevo API
        try {
            const apiKey = process.env.BREVO_API_KEY;

            // Prepare data for Brevo API
            const emailData = {
                sender: {
                    name: "KamenPro Website",
                    email: "info@kamenpro.net"
                },
                to: [
                    {
                        email: "info@kamenpro.net",
                        name: "KamenPro Team"
                    }
                ],
                replyTo: {
                    email: safeEmail,
                    name: safeName
                },
                subject: `Upit za proizvod: ${safeProductName} (${safeProductCode})`,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Novi upit za proizvod</h2>
                        
                        <div style="margin: 20px 0;">
                            <p><strong>Proizvod:</strong> ${safeProductName} (${safeProductCode})</p>
                            <p><strong>Količina:</strong> ${safeQuantity} m²</p>
                        </div>
                        
                        <div style="margin: 20px 0;">
                            <p><strong>Ime i prezime:</strong> ${safeName}</p>
                            <p><strong>Email:</strong> ${safeEmail}</p>
                            <p><strong>Telefon:</strong> ${safePhone}</p>
                        </div>
                        
                        <div style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>Poruka:</strong></p>
                            <p>${safeMessage}</p>
                        </div>
                        
                        <div style="font-size: 12px; margin-top: 30px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
                            <p>Ova poruka je automatski poslata sa web sajta KamenPro.</p>
                        </div>
                    </div>
                `,
                textContent: `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${safeMessage}`
            };

            // Send to Brevo using fetch
            console.log('Sending email via Brevo API...');
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': apiKey,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Email sent successfully via Brevo:', responseData);
            } else {
                console.error('Error from Brevo API:', response.status, responseData);

                // Attempt alternate delivery to avoid data loss
                console.log('Attempting alternate delivery method...');

                // Backup email to another address
                const backupEmailData = {
                    ...emailData,
                    to: [
                        {
                            email: "savic.damjan@gmx.de", // Alternativ-Email
                            name: "KamenPro Backup"
                        }
                    ]
                };

                try {
                    const backupResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'api-key': apiKey,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(backupEmailData)
                    });

                    if (backupResponse.ok) {
                        console.log('Backup email sent successfully');
                    } else {
                        console.error('Backup email also failed');
                    }
                } catch (backupError) {
                    console.error('Error sending backup email:', backupError);
                }
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // We continue even if email fails
        }

        // Return success regardless of email sending result
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
}