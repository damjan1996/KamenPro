// src/api/send-inquiry.js
import nodemailer from 'nodemailer';

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

// SMTP-Konfiguration für Hostinger mit Umgebungsvariablen
const createTransporter = () => {
    // Überprüfen der Umgebungsvariablen
    if (!validateEnvVars()) {
        throw new Error('Fehlende SMTP-Konfiguration in Umgebungsvariablen');
    }

    return nodemailer.createTransport({
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
};

// Funktion zum Versenden einer E-Mail
export async function sendInquiryEmail(inquiryData) {
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
        // Transporter erstellen
        const transporter = createTransporter();

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

export default sendInquiryEmail;