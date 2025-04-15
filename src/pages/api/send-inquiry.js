// pages/api/send-inquiry.js
import { sendInquiryEmail } from '../../src/api/send-inquiry';

export default async function handler(req, res) {
    // CORS-Header hinzufügen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS-Anfragen für CORS-Preflight behandeln
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Nur POST-Anfragen erlauben
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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

        // Fehlermeldung zurückgeben
        return res.status(500).json({
            error: 'Dogodila se greška prilikom slanja upita. Molimo pokušajte ponovo kasnije ili nas kontaktirajte telefonom.'
        });
    }
}