const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 🔓 Permitimos CORS
app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send("¡Hola Gero!");
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
