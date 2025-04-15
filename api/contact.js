// api/simple-contact.js
import fetch from 'node-fetch';

// Brevo API Key aus Umgebungsvariablen
const BREVO_API_KEY = process.env.BREVO_API_KEY || "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";

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

        const {
            name,
            email,
            phone,
            message,
            subject
        } = body;

        // Validieren der Pflichtfelder
        if (!name || !email || !message) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Ime, email i poruka su obavezni.' });
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

        // Nachricht in Serverlog schreiben (für Vercel sichtbar)
        console.log('KONTAKTANFRAGE ERHALTEN:');
        console.log('---------------------');
        console.log(`Name: ${safeName}`);
        console.log(`E-Mail: ${safeEmail}`);
        console.log(`Telefon: ${safePhone}`);
        console.log(`Thema: ${safeSubject}`);
        console.log(`Nachricht: ${safeMessage}`);
        console.log(`Zeitstempel: ${new Date().toISOString()}`);
        console.log('---------------------');

        try {
            // Daten für Brevo API vorbereiten
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
                subject: `Nova poruka: ${safeSubject}`,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nova poruka sa sajta</h2>
                        
                        <div style="margin: 20px 0;">
                            <p><strong>Tema:</strong> ${safeSubject}</p>
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
                textContent: `Nova poruka: ${safeSubject} od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${safeMessage}`
            };

            // An Brevo senden mit fetch
            console.log('Sending email via Brevo API...');
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Email sent successfully via Brevo:', responseData);
                return res.status(200).json({
                    success: true,
                    message: 'Vaša poruka je uspešno poslata.',
                    messageId: responseData.messageId
                });
            } else {
                console.error('Error from Brevo API:', response.status, responseData);

                // Alternative Speicherung zur Vermeidung von Datenverlust
                console.log('Contact details for backup purposes:');
                console.log(JSON.stringify({
                    customerName: safeName,
                    customerEmail: safeEmail,
                    customerPhone: safePhone,
                    subject: safeSubject,
                    message: safeMessage,
                    timestamp: new Date().toISOString()
                }, null, 2));

                return res.status(500).json({
                    error: 'Greška pri slanju poruke. Pokušajte ponovo ili nas kontaktirajte direktno.',
                    details: `API Fehler: ${response.status} ${JSON.stringify(responseData)}`
                });
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return res.status(500).json({
                error: 'Dogodila se greška prilikom slanja poruke. Molimo pokušajte ponovo kasnije ili nas kontaktirajte telefonom.',
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