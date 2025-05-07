const fs = require("fs");
const path = require("path");

const productosPath = path.join(__dirname, "../../data/productos.json");

// Leer productos
function getProductos(req, res) {
  try {
    const productos = JSON.parse(fs.readFileSync(productosPath, "utf8"));
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al leer los productos" });
  }
}

// Agregar producto
function agregarProducto(req, res) {
  try {
    const productos = JSON.parse(fs.readFileSync(productosPath, "utf8"));
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length
      ? productos[productos.length - 1].id + 1
      : 1;
    productos.push(nuevoProducto);
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
}

// Editar producto
function editarProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const productos = JSON.parse(fs.readFileSync(productosPath, "utf8"));
    const index = productos.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ error: "Producto no encontrado" });

    productos[index] = { ...productos[index], ...req.body };
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
    res.json(productos[index]);
  } catch (err) {
    res.status(500).json({ error: "Error al editar el producto" });
  }
}

// Eliminar producto
function eliminarProducto(req, res) {
  try {
    const id = parseInt(req.params.id);
    const productos = JSON.parse(fs.readFileSync(productosPath, "utf8"));
    const index = productos.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ error: "Producto no encontrado" });

    const eliminado = productos.splice(index, 1)[0];
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
    res.json({ status: "ok", eliminado });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
}

module.exports = {
  getProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
};
