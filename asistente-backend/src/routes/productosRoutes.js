let express;
try {
  express = require("express");
} catch {
  express = require("../expressFallback");
}
const router = express.Router();
const {
  getProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} = require("../controllers/productosController");

router.get("/", getProductos);
router.post("/", agregarProducto);
router.put("/:id", editarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
