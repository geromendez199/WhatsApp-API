const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Rutas
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

module.exports = app;

// Productos
const productosRoutes = require("./routes/productosRoutes");
app.use("/productos", productosRoutes);
