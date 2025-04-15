// api/simple-contact.js
// Eine vereinfachte Version, die den Empfang der Nachricht bestätigt,
// aber keine E-Mail sendet

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

        // Nachricht in Serverlog schreiben (für Vercel sichtbar)
        console.log('KONTAKTANFRAGE ERHALTEN:');
        console.log('---------------------');
        console.log(`Name: ${name}`);
        console.log(`E-Mail: ${email}`);
        console.log(`Telefon: ${phone || 'Nicht angegeben'}`);
        console.log(`Thema: ${subject || 'Nicht angegeben'}`);
        console.log(`Nachricht: ${message}`);
        console.log(`Zeitstempel: ${new Date().toISOString()}`);
        console.log('---------------------');

        // Erfolg zurückgeben
        return res.status(200).json({
            success: true,
            message: 'Vaša poruka je uspešno primljena. Naš tim će vas kontaktirati.',
            note: 'Poruka je primljena i zabeležena. Obradićemo je u najkraćem mogućem roku.'
        });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            error: 'Dogodila se greška. Molimo kontaktirajte nas direktno telefonom.',
            details: error.toString()
        });
    }
}