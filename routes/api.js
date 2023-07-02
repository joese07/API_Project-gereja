const router = require("express").Router();
const sabdaPaduaController = require("../controllers/sabdaPaduaController");
const authController = require("../controllers/authController");
const galleryController = require("../controllers/galleryController");
const pengumumanController = require("../controllers/pengumumanController");
const renunganController = require("../controllers/renunganController");
const resetPassword = require("../controllers/resetPasswordController");
const beritaController = require("../controllers/beritaController");
const restrict = require("../middlewares/restrict");

//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/changePassword", restrict, authController.changePassword);
router.get("/auth/user", restrict, authController.index);
router.get("/auth/home", restrict, authController.whoami);
router.post("/auth/forgot_password", authController.forgetPassword);
router.post("/forgotPassword", authController.checkEmailForgot);

//sabda-padua
router.get("/sabda-padua", sabdaPaduaController.index);
router.get("/sabda-padua/:id", sabdaPaduaController.show);
router.post("/sabda-padua/search", sabdaPaduaController.search);
router.post("/sabda-padua", restrict, sabdaPaduaController.store);
router.put("/sabda-padua/:id", restrict, sabdaPaduaController.update);
router.delete("/sabda-padua/:id", restrict, sabdaPaduaController.destroy);

//gallery
router.get("/gallery", galleryController.index);
router.post("/gallery", restrict, galleryController.store);
router.delete("/gallery/:id", restrict, galleryController.destroy);

//pengumuman
router.get("/pengumuman", pengumumanController.index);
router.post("/pengumuman", restrict, pengumumanController.store);
router.get("/pengumuman/:id", pengumumanController.show);
router.put("/pengumuman/:id", restrict, pengumumanController.update);
router.delete("/pengumuman/:id", restrict, pengumumanController.destroy);

//renungan
router.get("/renungan", renunganController.index);
router.post("/renungan", restrict, renunganController.store);
router.get("/renungan/:id", renunganController.show);
router.put("/renungan/:id", restrict, renunganController.update);
router.delete("/renungan/:id", renunganController.destroy);

//berita
router.get("/berita", beritaController.index);
router.post("/berita", restrict, beritaController.store);
router.get("/berita/:id", beritaController.show);
router.put("/berita/:id", restrict, beritaController.update);
router.delete("/berita/:id", restrict, beritaController.destroy);

//resetPassword

router.get("/reset_password", resetPassword.index);
router.post("/check_resetPassword", resetPassword.c_resetPassword);

module.exports = router;
