// brevo-test.js - Dieses Skript lokal ausführen, nicht im Projekt
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Direkter Test der Brevo-API
async function testBrevoAPI() {
    try {
        // API-Schlüssel hier direkt einsetzen für den Test (nur zu Testzwecken, nicht in Produktion)
        const API_KEY = process.env.SENDINBLUE_API_KEY;

        // Initialize Brevo API client
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = API_KEY;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        // Create sender object
        const sender = {
            name: "Test Sender",
            email: "info@kamenpro.net"  // Diese E-Mail muss in Brevo als verifizierter Absender eingerichtet sein
        };

        // Create recipient objects
        const recipients = [
            {
                email: "info@kamenpro.net",  // Diese E-Mail muss zugänglich sein
                name: "Test Recipient"
            }
        ];

        // Erstellen Sie ein SendSmtpEmail-Objekt
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.sender = sender;
        sendSmtpEmail.to = recipients;
        sendSmtpEmail.subject = "Test E-Mail von Brevo API";
        sendSmtpEmail.htmlContent = "<p>Dies ist eine Test-E-Mail, um zu prüfen, ob die Brevo-API funktioniert.</p>";
        sendSmtpEmail.textContent = "Dies ist eine Test-E-Mail, um zu prüfen, ob die Brevo-API funktioniert.";

        console.log('Sending test email via Brevo API...');
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Test email sent successfully! MessageId:', data.messageId);
        return true;
    } catch (error) {
        console.error('ERROR sending test email with Brevo:', error);
        return false;
    }
}

// Führe den Test aus
testBrevoAPI()
    .then(success => {
        if (success) {
            console.log('Brevo API test completed successfully!');
        } else {
            console.log('Brevo API test failed!');
        }
    })
    .catch(err => {
        console.error('Unexpected error during test:', err);
    });