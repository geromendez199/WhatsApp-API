const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../data/clientes.json");

// GET - Obtener todos los clientes
const getClientes = (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const clientes = JSON.parse(data);
    res.json(clientes);
  } catch (err) {
    console.error("Error al leer clientes:", err);
    res.status(500).json({ error: "Error al leer los clientes" });
  }
};

// POST - Agregar un nuevo cliente
const agregarCliente = (req, res) => {
  const { nombre, telefono } = req.body;

  if (!nombre || !telefono) {
    return res
      .status(400)
      .json({ error: "Nombre y teléfono son obligatorios" });
  }

  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const clientes = JSON.parse(data);

    const nuevoCliente = {
      id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
      nombre,
      telefono,
    };

    clientes.push(nuevoCliente);
    fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));

    res.status(201).json({ status: "ok", cliente: nuevoCliente });
  } catch (err) {
    console.error("Error al guardar cliente:", err);
    res.status(500).json({ error: "Error al guardar el cliente" });
  }
};

// PUT - Editar un cliente existente
const editarCliente = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, telefono } = req.body;

  if (!nombre && !telefono) {
    return res
      .status(400)
      .json({
        error: "Se necesita al menos nombre o teléfono para actualizar",
      });
  }

  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const clientes = JSON.parse(data);

    const index = clientes.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    if (nombre) clientes[index].nombre = nombre;
    if (telefono) clientes[index].telefono = telefono;

    fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));

    res.json({ status: "ok", cliente: clientes[index] });
  } catch (err) {
    console.error("Error al editar cliente:", err);
    res.status(500).json({ error: "Error al editar el cliente" });
  }
};

// DELETE - Eliminar un cliente por ID
const eliminarCliente = (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const clientes = JSON.parse(data);

    const index = clientes.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const clienteEliminado = clientes.splice(index, 1)[0];

    fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));

    res.json({ status: "ok", eliminado: clienteEliminado });
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

// Exportamos todas las funciones
module.exports = {
  getClientes,
  agregarCliente,
  editarCliente,
  eliminarCliente,
};
