try {
  require("dotenv").config();
} catch (err) {
  console.warn("dotenv no instalado, se omite carga de variables");
}
let cors;
try {
  cors = require("cors");
} catch (err) {
  console.warn("Modulo cors no instalado, se omite CORS");
  cors = () => (req, res, next) => next();
}

const app = require("./src/app");
if (!app) {
  console.error("No se pudo iniciar la aplicacion por falta de dependencias.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send("¡Hola Gero!");
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
