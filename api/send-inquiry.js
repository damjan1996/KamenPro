// api/send-inquiry.js
const nodemailer = require('nodemailer');

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
        const safeMessage = message ? String(message).replace(/\n/g, '<br>').replace(/[<>]/g, '') : 'No message';

        // Create HTML email content
        const htmlContent = `
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
        `;

        // Workaround: Store the message in Supabase since we're already using it
        // If you have Supabase configured, this is a good alternative to ensure data is captured
        try {
            const { createClient } = require('@supabase/supabase-js');
            const supabaseUrl = process.env.VITE_SUPABASE_URL;
            const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseKey) {
                console.log('Attempting to store inquiry in Supabase...');
                const supabase = createClient(supabaseUrl, supabaseKey);

                const { data, error } = await supabase
                    .from('inquiries')
                    .insert([
                        {
                            name: safeName,
                            email: safeEmail,
                            phone: safePhone,
                            message: safeMessage,
                            product_name: safeProductName,
                            product_code: safeProductCode,
                            quantity: safeQuantity,
                            created_at: new Date().toISOString()
                        }
                    ]);

                if (error) {
                    console.error('Supabase storage error:', error);
                } else {
                    console.log('Successfully stored inquiry in Supabase');
                }
            } else {
                console.log('Supabase credentials not found, skipping database storage');
            }
        } catch (dbError) {
            console.error('Error while trying to store in database:', dbError);
        }

        // Fallback email method: Using SendGrid
        try {
            if (process.env.SENDGRID_API_KEY) {
                console.log('Attempting to send via SendGrid...');
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                const msg = {
                    to: process.env.TO_EMAIL || process.env.SMTP_USER || 'info@kamenpro.net',
                    from: process.env.FROM_EMAIL || process.env.SMTP_USER || 'info@kamenpro.net',
                    subject: `Upit za proizvod: ${safeProductName} (${safeProductCode})`,
                    text: `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${message}`,
                    html: htmlContent,
                    replyTo: safeEmail
                };

                const result = await sgMail.send(msg);
                console.log('SendGrid email sent successfully');
            } else {
                console.log('SendGrid API key not found, trying original SMTP...');

                // Original SMTP as fallback
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT || '465'),
                    secure: process.env.SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                    connectionTimeout: 10000,
                    greetingTimeout: 10000,
                    socketTimeout: 10000,
                });

                const mailOptions = {
                    from: `"KamenPro Web" <${process.env.SMTP_USER}>`,
                    to: process.env.SMTP_USER,
                    subject: `Upit za proizvod: ${safeProductName} (${safeProductCode})`,
                    html: htmlContent,
                    replyTo: safeEmail,
                    text: `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${message}`,
                };

                const info = await transporter.sendMail(mailOptions);
                console.log('Original SMTP email sent successfully:', info.messageId);
            }
        } catch (emailError) {
            console.error('Error with email sending:', emailError);
            // We don't throw here to avoid affecting the user response
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
};