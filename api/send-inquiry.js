// api/send-inquiry.js
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
            productId,
            productName,
            productCode,
            quantity
        } = body;

        console.log('Anfragedaten erhalten:', { name, email, phone, productName, productCode });

        // Pflichtfelder prüfen
        if (!name || !email || !phone || !message || !productName || !productCode) {
            console.log('Validierung fehlgeschlagen: Pflichtfelder fehlen');
            return res.status(400).json({ error: 'Svi potrebni podaci moraju biti popunjeni.' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Validierung fehlgeschlagen: Ungültiges E-Mail-Format');
            return res.status(400).json({ error: 'Email adresa nije ispravna.' });
        }

        // Eingabedaten bereinigen
        const safeProductName = productName ? String(productName).replace(/[<>]/g, '') : 'Unknown';
        const safeProductCode = productCode ? String(productCode).replace(/[<>]/g, '') : 'Unknown';
        const safeQuantity = quantity ? String(quantity).replace(/[<>]/g, '') : '1';
        const safeName = name ? String(name).replace(/[<>]/g, '') : 'Unknown';
        const safeEmail = email ? String(email).replace(/[<>]/g, '') : 'Unknown';
        const safePhone = phone ? String(phone).replace(/[<>]/g, '') : 'Unknown';
        const safeMessage = message ? String(message).replace(/[<>]/g, '') : 'No message';

        // Anfrage im Konsole loggen (wird in Vercel-Logs sichtbar sein)
        console.log('ANFRAGE ERHALTEN:');
        console.log('---------------------');
        console.log(`Produkt: ${safeProductName} (${safeProductCode})`);
        console.log(`Menge: ${safeQuantity}`);
        console.log(`Kunde: ${safeName}`);
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
            sendSmtpEmail.subject = `Upit za proizvod: ${safeProductName} (${safeProductCode})`;
            sendSmtpEmail.htmlContent = `
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
            sendSmtpEmail.textContent = `Novi upit za proizvod ${safeProductName} (${safeProductCode}) od ${safeName}. Email: ${safeEmail}, Telefon: ${safePhone}. Poruka: ${safeMessage}`;

            console.log('Sende E-Mail über Brevo API...');
            // Senden und verarbeiten der Antwort
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('E-Mail erfolgreich gesendet! MessageId:', data.messageId);

            // Erfolg zurückgeben
            return res.status(200).json({
                success: true,
                message: 'Vaš upit je uspešno poslat.',
                messageId: data.messageId
            });

        } catch (emailError) {
            console.error('Fehler beim Senden der E-Mail:', emailError);
            // Bei Fehler detaillierte Fehlermeldung zurückgeben
            const errorMessage = emailError.message || 'Unknown email sending error';
            const errorStatus = emailError.status || 500;

            // Versuch, wichtige Daten zu sichern
            console.log('Anfragedaten für Backup-Zwecke:');
            console.log(JSON.stringify({
                customerName: safeName,
                customerEmail: safeEmail,
                customerPhone: safePhone,
                productDetails: `${safeProductName} (${safeProductCode})`,
                quantity: safeQuantity,
                message: safeMessage,
                timestamp: new Date().toISOString()
            }, null, 2));

            // Fehlermeldung an Client zurückgeben
            return res.status(errorStatus).json({
                error: `Greška pri slanju poruke: ${errorMessage}`,
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