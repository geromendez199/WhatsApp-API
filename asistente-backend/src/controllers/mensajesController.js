const { enviarWhatsApp } = require("../services/whatsappService");

const enviarMensaje = async (req, res) => {
  const { mensaje, destino } = req.body;

  if (!mensaje || !destino) {
    return res.status(400).json({ error: "Faltan datos: mensaje o destino" });
  }

  try {
    const sid = await enviarWhatsApp(destino, mensaje);
    res.json({ status: "ok", sid });
  } catch (err) {
    console.error("Error al enviar mensaje:", err.message);
    res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
};

module.exports = {
  enviarMensaje,
};
