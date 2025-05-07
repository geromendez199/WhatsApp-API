const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
