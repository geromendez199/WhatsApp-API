const enviarMensaje = (req, res) => {
  const { mensaje, destino } = req.body;

  if (!mensaje || !destino) {
    return res.status(400).json({ error: "Faltan datos: mensaje o destino" });
  }

  res.json({
    status: "ok",
    mensaje: `Mensaje enviado a ${destino}: "${mensaje}"`,
  });
};

module.exports = {
  enviarMensaje,
};
