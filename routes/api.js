const router = require("express").Router();
const sabdaPaduaController = require("../controllers/sabdaPaduaController");
const authController = require("../controllers/authController");
const galleryController = require("../controllers/galleryController");
const pengumumanContrller = require("../controllers/pengumumanController");
const restrict = require("../middlewares/restrict");

//auth
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

//gallery
router.get("/gallery", galleryController.index);
router.post("/gallery", restrict, galleryController.store);
router.delete("/gallery/:id", restrict, galleryController.destroy);

//pengumuman
router.get("/pengumuman", pengumumanContrller.index);
router.post("/pengumuman", restrict, pengumumanContrller.store);
router.get("/pengumuman/:id", pengumumanContrller.show);
router.put("/pengumuman/:id", restrict, pengumumanContrller.update);
router.delete("/pengumuman/:id", restrict, pengumumanContrller.destroy);

module.exports = router;
