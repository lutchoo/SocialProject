const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");

// Notez que nous n'importons pas multer directement ici

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.put("/follow/:id", userController.follow);
router.put("/unfollow/:id", userController.unfollow);

//upload
// Utilisez une importation dynamique pour importer multer
import("multer")
  .then((multer) => {
    const upload = multer.default(); // Assurez-vous d'utiliser multer.default()
    router.post(
      "/upload",
      upload.single("file"),
      uploadController.uploadProfil
    );
  })
  .catch((error) => {
    console.error("Erreur lors de l'importation de multer :", error);
  });

module.exports = router;
