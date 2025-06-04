let express;
try {
  express = require("express");
} catch (err) {
  console.warn("Express no instalado, usando implementacion basica");
  express = require("./expressFallback");
}

const app = express();

// Middleware
app.use(express.json());

// Rutas
const indexRoutes = require("./routes/index");
const clientesRoutes = require("./routes/clientesRoutes");
const productosRoutes = require("./routes/productosRoutes");

app.use("/", indexRoutes);
app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);

module.exports = app;
