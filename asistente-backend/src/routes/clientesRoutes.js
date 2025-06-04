let express;
try {
  express = require("express");
} catch {
  express = require("../expressFallback");
}
const router = express.Router();

// Importamos las funciones del controller
const {
  getClientes,
  agregarCliente,
  editarCliente,
  eliminarCliente,
  enviarMensajeACliente,
} = require("../controllers/clientesController");

// GET - Obtener todos los clientes
router.get("/", getClientes);

// POST - Agregar un nuevo cliente
router.post("/", agregarCliente);

// PUT - Editar un cliente por ID
router.put("/:id", editarCliente);

// POST - Enviar mensaje a un cliente
router.post("/:id/mensaje", enviarMensajeACliente);

// DELETE - Eliminar un cliente por ID
router.delete("/:id", eliminarCliente);

module.exports = router;
