const express = require("express");
const router = express.Router();

// Importamos las funciones del controller
const {
  getClientes,
  agregarCliente,
  editarCliente,
  eliminarCliente,
} = require("../controllers/clientesController");

// GET - Obtener todos los clientes
router.get("/", getClientes);

// POST - Agregar un nuevo cliente
router.post("/", agregarCliente);

// PUT - Editar un cliente por ID
router.put("/:id", editarCliente);

// DELETE - Eliminar un cliente por ID
router.delete("/:id", eliminarCliente);

module.exports = router;
