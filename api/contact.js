// api/contact.js
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Brevo API Key direkt einsetzen
const BREVO_API_KEY = "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";

// Vercel Serverless Function
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
        console.log(`Methode ${req.method} nicht erlaubt, nur POST wird akzeptiert`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Request-Body parsen, wenn es ein String ist
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.error('Ungültiges JSON im Request-Body', e);
                return res.status(400).json({ error: 'Invalid JSON in request body' });
            }
        }

        // Prüfen, ob Body existiert und nicht leer ist
        if (!body || Object.keys(body).length === 0) {
            console.log('Leerer Request-Body erhalten');
            return res.status(400).json({ error: 'Nema podataka u zahtevu.' });
        }

        const {
            name,
            email,
            phone,
            message,
            subject
        } = body;

        console.log('Kontaktanfrage erhalten:', { name, email, phone, subject });

        // Pflichtfelder prüfen
        if (!name || !email || !message) {
            console.log('Validierung fehlgeschlagen: Pflichtfelder fehlen');
            return res.status(400).json({ error: 'Svi potrebni podaci moraju biti popunjeni.' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Validierung fehlgeschlagen: Ungültiges E-Mail-Format');
            return res.status(400).json({ error: 'Email adresa nije ispravna.' });
        }

        // Eingabedaten bereinigen
        const safeName = name ? String(name).replace(/[<>]/g, '') : 'Unknown';
        const safeEmail = email ? String(email).replace(/[<>]/g, '') : 'Unknown';
        const safePhone = phone ? String(phone).replace(/[<>]/g, '') : 'Unknown';
        const safeMessage = message ? String(message).replace(/[<>]/g, '') : 'No message';
        const safeSubject = subject ? String(subject).replace(/[<>]/g, '') : 'General inquiry';

        // Anfrage im Konsole loggen
        console.log('KONTAKTANFRAGE ERHALTEN:');
        console.log('---------------------');
        console.log(`Thema: ${safeSubject}`);
        console.log(`Name: ${safeName}`);
        console.log(`E-Mail: ${safeEmail}`);
        console.log(`Telefon: ${safePhone}`);
        console.log(`Nachricht: ${safeMessage}`);
        console.log('---------------------');

        try {
            // Initialize Brevo API client
            const defaultClient = SibApiV3Sdk.ApiClient.instance;
            const apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = BREVO_API_KEY;

            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

            // Create sender object
            const sender = {
                name: "KamenPro Website",
                email: "info@kamenpro.net"  // Diese E-Mail muss in Brevo als verifizierter Absender eingerichtet sein
            };

            // Create recipient objects
            const recipients = [
                {
                    email: "info@kamenpro.net",  // Empfänger-E-Mail
                    name: "KamenPro Team"
                }
            ];

            // Create SendSmtpEmail object
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.sender = sender;
            sendSmtpEmail.to = recipients;
            sendSmtpEmail.replyTo = { email: safeEmail, name: safeName };
            sendSmtpEmail.subject = `Kontaktanfrage: ${safeSubject}`;
            sendSmtpEmail.htmlContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                    <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Neue Kontaktanfrage</h2>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>Thema:</strong> ${safeSubject}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>Name:</strong> ${safeName}</p>
                        <p><strong>E-Mail:</strong> ${safeEmail}</p>
                        <p><strong>Telefon:</strong> ${safePhone}</p>
                    </div>
                    
                    <div style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                        <p><strong>Nachricht:</strong></p>
                        <p>${safeMessage}</p>
                    </div>
                    
                    <div style="font-size: 12px; margin-top: 30px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
                        <p>Diese Nachricht wurde automatisch von der KamenPro-Website gesendet.</p>
                    </div>
                </div>
            `;
            sendSmtpEmail.textContent = `Neue Kontaktanfrage: ${safeSubject} von ${safeName}. E-Mail: ${safeEmail}, Telefon: ${safePhone}. Nachricht: ${safeMessage}`;

            console.log('Sende E-Mail über Brevo API...');
            // Senden und verarbeiten der Antwort
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('E-Mail erfolgreich gesendet! MessageId:', data.messageId);

            // Erfolg zurückgeben
            return res.status(200).json({
                success: true,
                message: 'Vaša poruka je uspešno poslata.',
                messageId: data.messageId
            });

        } catch (emailError) {
            console.error('Fehler beim Senden der E-Mail:', emailError);

            // Versuch, wichtige Daten zu sichern
            console.log('Kontaktdaten für Backup-Zwecke:');
            console.log(JSON.stringify({
                name: safeName,
                email: safeEmail,
                phone: safePhone,
                subject: safeSubject,
                message: safeMessage,
                timestamp: new Date().toISOString()
            }, null, 2));

            // Fehlermeldung an Client zurückgeben
            return res.status(500).json({
                error: 'Greška pri slanju poruke. Pokušajte ponovo ili nas kontaktirajte direktno.',
                details: emailError.toString()
            });
        }
    } catch (error) {
        console.error('API-Fehler:', error);
        return res.status(500).json({
            error: 'Dogodila se greška prilikom slanja upita. Molimo pokušajte ponovo kasnije ili nas kontaktirajte telefonom.',
            details: error.toString()
        });
    }
}