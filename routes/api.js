const router = require("express").Router();
const sabdaPaduaController = require("../controllers/sabdaPaduaController");

router.get("/sabda-padua", sabdaPaduaController.index);
router.get("/sabda-padua/:id", sabdaPaduaController.show);
router.post("/sabda-padua", sabdaPaduaController.store);
router.put("/sabda-padua/:id", sabdaPaduaController.update);
router.delete("/sabda-padua/:id", sabdaPaduaController.destroy);

module.exports = router;
