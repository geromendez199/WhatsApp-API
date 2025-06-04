let express;
try {
  express = require("express");
} catch {
  express = require("../expressFallback");
}
const router = express.Router();

const mainController = require("../controllers/mainController");
const mensajesController = require("../controllers/mensajesController");

router.post("/mensajes", mensajesController.enviarMensaje);
router.get("/", mainController.home);

module.exports = router;
