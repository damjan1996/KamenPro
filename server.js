// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Function to validate environment variables
function validateEnvVars() {
    const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error(`Missing environment variables: ${missingVars.join(', ')}`);
        return false;
    }
    return true;
}

// Email sending function
async function sendInquiryEmail(inquiryData) {
    // Check if inquiryData is a valid object
    if (!inquiryData || typeof inquiryData !== 'object') {
        throw new Error('Invalid inquiry data');
    }

    const {
        name,
        email,
        phone,
        message,
        productName,
        productCode,
        quantity
    } = inquiryData;

    // Basic validation of required fields
    if (!name || !email || !phone || !message || !productName || !productCode) {
        throw new Error('Missing required fields for email');
    }

    console.log('Preparing to send email with data:', {
        name,
        email,
        phone,
        productName,
        productCode,
        quantity,
        messagePreview: message?.substring(0, 20) + '...'
    });

    try {
        // Check environment variables
        if (!validateEnvVars()) {
            throw new Error('Missing SMTP configuration in environment variables');
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            // Timeout settings
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 10000,
            socketTimeout: 15000,
        });

        // HTML email template with sanitization
        const safeProductName = productName ? String(productName).replace(/[<>]/g, '') : 'Unknown';
        const safeProductCode = productCode ? String(productCode).replace(/[<>]/g, '') : 'Unknown';
        const safeQuantity = quantity ? String(quantity).replace(/[<>]/g, '') : '1';
        const safeName = name ? String(name).replace(/[<>]/g, '') : 'Unknown';
        const safeEmail = email ? String(email).replace(/[<>]/g, '') : 'Unknown';
        const safePhone = phone ? String(phone).replace(/[<>]/g, '') : 'Unknown';
        const safeMessage = message ? String(message).replace(/\n/g, '<br>').replace(/[<>]/g, '') : 'No message';

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

        // Email options
        const mailOptions = {
            from: `"KamenPro Web" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: `Upit za proizvod: ${safeProductName} (${safeProductCode})`,
            html: htmlContent,
            replyTo: safeEmail,
            text: `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${message}`,
        };

        // Debug SMTP configuration information
        console.log('SMTP Configuration:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            user: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD ? '****' : 'not set'
        });

        // Send email
        console.log('Attempting to send email via SMTP');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// API route for sending inquiries
app.post('/api/send-inquiry', async (req, res) => {
    try {
        // Check if req.body exists and is not an empty object
        if (!req.body || Object.keys(req.body).length === 0) {
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
        } = req.body;

        // Debug logging
        console.log('Received inquiry data:', {
            name,
            email,
            phone,
            message: message?.substring(0, 30) + '...',
            productId,
            productName,
            productCode,
            quantity
        });

        // Data validation
        if (!name || !email || !phone || !message || !productName || !productCode) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Svi potrebni podaci moraju biti popunjeni.' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Validation failed: Invalid email format');
            return res.status(400).json({ error: 'Email adresa nije ispravna.' });
        }

        // Send email
        console.log('Calling sendInquiryEmail function');

        try {
            const result = await sendInquiryEmail({
                name,
                email,
                phone,
                message,
                productName,
                productCode,
                quantity: quantity || 1, // Default value if undefined
                productId: productId || '' // Default value if undefined
            });

            console.log('Email sent successfully', result);

            // Return success message
            return res.status(200).json({ success: true, message: 'Vaš upit je uspešno poslat.' });
        } catch (emailError) {
            console.error('Error in sendInquiryEmail function:', emailError);
            return res.status(500).json({
                error: 'Dogodila se greška prilikom slanja e-maila. Molimo kontaktirajte nas telefonom.'
            });
        }
    } catch (error) {
        console.error('API error in request processing:', error);
        return res.status(500).json({
            error: 'Dogodila se greška prilikom slanja upita. Molimo pokušajte ponovo kasnije ili nas kontaktirajte telefonom.'
        });
    }
});

// Test route for healthcheck
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});