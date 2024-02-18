const router = require("express").Router();
const postController = require("../controllers/post.controller");

router.get("/", postController.readPost);
import("multer")
  .then((multer) => {
    const upload = multer.default(); // Assurez-vous d'utiliser multer.default()
    router.post("/", upload.single("file"), postController.createPost);
  })
  .catch((error) => {
    console.error("Erreur lors de l'importation de multer :", error);
  });
// router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

//comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment_post/:id", postController.deleteCommentPost);

module.exports = router;
