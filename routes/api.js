const router = require("express").Router();
const sabdaPaduaController = require("../controllers/sabdaPaduaController");
const authController = require("../controllers/authController");
const restrict = require("../middlewares/restrict");

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/user", restrict, authController.index);
router.get("/auth/home", restrict, authController.whoami);

//sabda-padua
router.get("/sabda-padua", sabdaPaduaController.index);
router.get("/sabda-padua/:id", sabdaPaduaController.show);
router.post("/sabda-padua", restrict, sabdaPaduaController.store);
router.put("/sabda-padua/:id", restrict, sabdaPaduaController.update);
router.delete("/sabda-padua/:id", restrict, sabdaPaduaController.destroy);

module.exports = router;
