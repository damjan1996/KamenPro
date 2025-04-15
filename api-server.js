// api-server.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Laden der Umgebungsvariablen aus .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Funktion zur Überprüfung der Umgebungsvariablen
function validateEnvVars() {
    const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error(`Fehlende Umgebungsvariablen: ${missingVars.join(', ')}`);
        return false;
    }
    return true;
}

// E-Mail-Versandfunktion
async function sendInquiryEmail(inquiryData) {
    // Überprüfen, ob inquiryData ein gültiges Objekt ist
    if (!inquiryData || typeof inquiryData !== 'object') {
        throw new Error('Ungültige Anfragedaten');
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

    // Grundlegende Validierung der erforderlichen Felder
    if (!name || !email || !phone || !message || !productName || !productCode) {
        throw new Error('Fehlende erforderliche Felder für die E-Mail');
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
        // Überprüfen der Umgebungsvariablen
        if (!validateEnvVars()) {
            throw new Error('Fehlende SMTP-Konfiguration in Umgebungsvariablen');
        }

        // Transporter erstellen
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            // Timeout-Einstellungen hinzufügen
            connectionTimeout: 10000, // 10 Sekunden
            greetingTimeout: 10000,
            socketTimeout: 15000,
        });

        // HTML-E-Mail-Template mit Sanitierung
        const safeProductName = productName ? String(productName).replace(/[<>]/g, '') : 'Unbekannt';
        const safeProductCode = productCode ? String(productCode).replace(/[<>]/g, '') : 'Unbekannt';
        const safeQuantity = quantity ? String(quantity).replace(/[<>]/g, '') : '1';
        const safeName = name ? String(name).replace(/[<>]/g, '') : 'Unbekannt';
        const safeEmail = email ? String(email).replace(/[<>]/g, '') : 'Unbekannt';
        const safePhone = phone ? String(phone).replace(/[<>]/g, '') : 'Unbekannt';
        const safeMessage = message ? String(message).replace(/\n/g, '<br>').replace(/[<>]/g, '') : 'Keine Nachricht';

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

        // E-Mail-Optionen
        const mailOptions = {
            from: `"KamenPro Web" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: `Upit za proizvod: ${safeProductName} (${safeProductCode})`,
            html: htmlContent,
            replyTo: safeEmail,
            text: `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${message}`,
        };

        // Debug-Informationen zur SMTP-Konfiguration
        console.log('SMTP Configuration:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            user: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD ? '****' : 'not set'
        });

        // E-Mail senden
        console.log('Attempting to send email via SMTP');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// API-Route für das Senden von Anfragen
app.post('/api/send-inquiry', async (req, res) => {
    try {
        // Prüfen, ob req.body existiert und kein leeres Objekt ist
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

        // Debug-Logging
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

        // Validierung der Daten
        if (!name || !email || !phone || !message || !productName || !productCode) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Svi potrebni podaci moraju biti popunjeni.' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Validation failed: Invalid email format');
            return res.status(400).json({ error: 'Email adresa nije ispravna.' });
        }

        // E-Mail senden
        console.log('Calling sendInquiryEmail function');

        try {
            const result = await sendInquiryEmail({
                name,
                email,
                phone,
                message,
                productName,
                productCode,
                quantity: quantity || 1, // Standardwert falls undefined
                productId: productId || '' // Standardwert falls undefined
            });

            console.log('Email sent successfully', result);

            // Erfolgsmeldung zurückgeben
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

// Testroute für Healthcheck
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API server is running' });
});

// Server starten
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});