const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const clientesController = require("../controllers/clientesController");
const productosController = require("../controllers/productosController");
const mensajesController = require("../controllers/mensajesController");

router.post("/mensajes", mensajesController.enviarMensaje);
router.get("/", mainController.home);
router.get("/clientes", clientesController.getClientes);
router.get("/productos", productosController.getProductos);

module.exports = router;
