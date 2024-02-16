const router = require("express").Router();
const sabdaPaduaController = require("../controllers/sabdaPaduaController");
const authController = require("../controllers/authController");
const galleryController = require("../controllers/galleryController");
const pengumumanController = require("../controllers/pengumumanController");
const renunganController = require("../controllers/renunganController");
const resetPassword = require("../controllers/resetPasswordController");
const beritaController = require("../controllers/beritaController");
const likeAndComment = require("../controllers/likeandcommentController");
const roles = require("../controllers/roleController");
const usersRoles = require("../controllers/userRoleController");
const contentSeksi = require("../controllers/contentSeksiController");
const restrict = require("../middlewares/restrict");

//auth
router.post("/auth/login", authController.login);
router.post("/auth/register", restrict, authController.register);
router.post("/auth/changePassword", restrict, authController.changePassword);
router.get("/auth/home", restrict, authController.whoami);
router.get("/auth/users", restrict, authController.index);
router.get("/auth/user/:id", restrict, authController.show);
router.post("/auth/forgot_password", authController.forgetPassword);
router.post("/forgotPassword", authController.checkEmailForgot);
router.put(
  "/user/update/picture",
  restrict,
  authController.changePictureProfile
);
router.delete("/auth/user/:id", restrict, authController.destroy);

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
router.post("/activeRenungan", restrict, renunganController.activeContent);
router.delete("/renungan/:id", renunganController.destroy);

//berita
router.get("/berita", beritaController.index);
router.post("/berita", restrict, beritaController.store);
router.get("/berita/:id", beritaController.show);
router.post("/berita/search", beritaController.search);
router.put("/berita/:id", restrict, beritaController.update);
router.delete("/berita/:id", restrict, beritaController.destroy);

//LikeandComment
router.get("/likeandcomment/berita", likeAndComment.index);
router.post("/likeandcomment/berita", likeAndComment.store);
router.get("/likeandcomment/berita/:id", likeAndComment.showbyIdContent);

//resetPassword

router.get("/reset_password", resetPassword.index);
router.post("/check_resetPassword", resetPassword.c_resetPassword);

//Role
router.get("/roles", restrict, roles.index);
router.get("/roles/:id", restrict, roles.show);
router.post("/roles", restrict, roles.store);

//userRoles
router.get("/userroles", restrict, usersRoles.index);
router.post("/userroles", restrict, usersRoles.store);

//content-seksi
router.get("/content_seksi", contentSeksi.index);
router.post("/content_seksi", restrict, contentSeksi.store);
router.get("/content_seksi/:id", contentSeksi.show);
router.post("/content_seksi/search", contentSeksi.search);
router.put("/content_seksi/edit/:id", restrict, contentSeksi.update);
router.delete("/content_seksi/:id", restrict, contentSeksi.destroy);
router.put("/content_seksi/status", restrict, contentSeksi.activeContent);
module.exports = router;
