const router = require("express").Router();
const sabdaPaduaController = require("../controllers/sabdaPaduaController");
const authController = require("../controllers/authController");

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/user", authController.index);
router.get("/auth/whoami", authController.whoami);

//sabda-padua
router.get("/sabda-padua", sabdaPaduaController.index);
router.get("/sabda-padua/:id", sabdaPaduaController.show);
router.post("/sabda-padua", sabdaPaduaController.store);
router.put("/sabda-padua/:id", sabdaPaduaController.update);
router.delete("/sabda-padua/:id", sabdaPaduaController.destroy);

module.exports = router;
