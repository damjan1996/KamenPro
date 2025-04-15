// api/simple-smtp-contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // CORS-Header setzen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS-Anfragen für CORS-Preflight behandeln
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Nur POST-Anfragen zulassen
    if (req.method !== 'POST') {
        console.log(`Method ${req.method} not allowed, only POST is accepted`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Request-Body parsen, wenn es ein String ist
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.error('Invalid JSON in request body', e);
                return res.status(400).json({ error: 'Invalid JSON in request body' });
            }
        }

        // Prüfen, ob Body existiert und nicht leer ist
        if (!body || Object.keys(body).length === 0) {
            console.log('Empty request body received');
            return res.status(400).json({ error: 'Nema podataka u zahtevu.' });
        }

        // Daten aus dem Request-Body extrahieren
        const {
            name,
            email,
            phone,
            message,
            subject,
            productName,
            productCode,
            quantity
        } = body;

        // Validieren der Pflichtfelder
        if (!name || !email) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Ime i email su obavezni.' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Validation failed: Invalid email format');
            return res.status(400).json({ error: 'Email adresa nije ispravna.' });
        }

        // Eingabedaten bereinigen
        const safeName = name ? String(name).replace(/[<>]/g, '') : 'Unknown';
        const safeEmail = email ? String(email).replace(/[<>]/g, '') : 'Unknown';
        const safePhone = phone ? String(phone).replace(/[<>]/g, '') : 'Nije unet';
        const safeMessage = message ? String(message).replace(/[<>]/g, '') : 'No message';
        const safeSubject = subject ? String(subject).replace(/[<>]/g, '') : 'Opšti upit';
        const safeProductName = productName ? String(productName).replace(/[<>]/g, '') : '';
        const safeProductCode = productCode ? String(productCode).replace(/[<>]/g, '') : '';
        const safeQuantity = quantity ? String(quantity).replace(/[<>]/g, '') : '';

        // Nachricht in Serverlog schreiben (für Vercel sichtbar)
        console.log('KONTAKTANFRAGE ERHALTEN:');
        console.log('---------------------');
        console.log(`Name: ${safeName}`);
        console.log(`E-Mail: ${safeEmail}`);
        console.log(`Telefon: ${safePhone}`);

        if (safeProductName) {
            console.log(`Produkt: ${safeProductName} (${safeProductCode})`);
            console.log(`Menge: ${safeQuantity}`);
            console.log(`Nachricht: ${safeMessage}`);
        } else {
            console.log(`Thema: ${safeSubject}`);
            console.log(`Nachricht: ${safeMessage}`);
        }

        console.log(`Zeitstempel: ${new Date().toISOString()}`);
        console.log('---------------------');

        try {
            // SMTP-Transport konfigurieren mit Werten aus process.env
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.hostinger.com',
                port: parseInt(process.env.SMTP_PORT || '465'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER || 'info@kamenpro.net',
                    pass: process.env.SMTP_PASSWORD || 'KamenProLogin1!'
                }
            });

            // E-Mail-Betreff festlegen
            let emailSubject = safeProductName
                ? `Upit za proizvod: ${safeProductName} (${safeProductCode})`
                : `Nova poruka: ${safeSubject}`;

            // E-Mail-Inhalt erstellen
            let htmlContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                    <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        ${safeProductName ? 'Novi upit za proizvod' : 'Nova poruka sa sajta'}
                    </h2>
                    
                    ${safeProductName ? `
                    <div style="margin: 20px 0;">
                        <p><strong>Proizvod:</strong> ${safeProductName} (${safeProductCode})</p>
                        <p><strong>Količina:</strong> ${safeQuantity} m²</p>
                    </div>
                    ` : `
                    <div style="margin: 20px 0;">
                        <p><strong>Tema:</strong> ${safeSubject}</p>
                    </div>
                    `}
                    
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

            // Textversion der E-Mail
            let textContent = safeProductName
                ? `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${safeMessage}`
                : `Nova poruka: ${safeSubject} od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${safeMessage}`;

            // E-Mail-Optionen
            const mailOptions = {
                from: {
                    name: 'KamenPro Website',
                    address: process.env.SMTP_USER || 'info@kamenpro.net'
                },
                to: process.env.SMTP_USER || 'info@kamenpro.net',
                replyTo: safeEmail,
                subject: emailSubject,
                text: textContent,
                html: htmlContent
            };

            // E-Mail senden
            console.log('Sending email via SMTP...');
            const info = await transporter.sendMail(mailOptions);

            console.log('Email sent successfully via SMTP:', info);
            return res.status(200).json({
                success: true,
                message: 'Vaša poruka je uspešno poslata.',
                messageId: info.messageId
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);

            // Alternative Speicherung zur Vermeidung von Datenverlust
            console.log('Contact details for backup purposes:');
            console.log(JSON.stringify({
                customerName: safeName,
                customerEmail: safeEmail,
                customerPhone: safePhone,
                subject: safeSubject,
                productName: safeProductName,
                productCode: safeProductCode,
                quantity: safeQuantity,
                message: safeMessage,
                timestamp: new Date().toISOString()
            }, null, 2));

            return res.status(500).json({
                error: 'Greška pri slanju poruke. Pokušajte ponovo ili nas kontaktirajte direktno.',
                details: emailError.toString()
            });
        }
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            error: 'Dogodila se greška. Molimo kontaktirajte nas direktno telefonom.',
            details: error.toString()
        });
    }
}