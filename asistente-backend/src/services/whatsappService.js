let twilio;
try {
  twilio = require('twilio');
} catch (err) {
  console.warn('Modulo twilio no instalado, servicio de WhatsApp deshabilitado');
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+14155238886'

let client;
if (twilio && accountSid && authToken) {
  client = twilio(accountSid, authToken);
} else if (!twilio) {
  // No twilio module available
  console.warn('Modulo twilio no instalado. Servicio WhatsApp deshabilitado.');
} else {
  console.warn('Twilio credentials missing. WhatsApp service disabled.');
}

async function enviarWhatsApp(destino, mensaje) {
  if (!client) {
    throw new Error('Servicio de WhatsApp no configurado');
  }

  const response = await client.messages.create({
    body: mensaje,
    from,
    to: `whatsapp:${destino}`,
  });

  return response.sid;
}

module.exports = { enviarWhatsApp };
