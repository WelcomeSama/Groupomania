const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postController");
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer();
const auth = require("../middleware/auth");

router.get("/", auth, postCtrl.readPost);
router.post("/", auth, upload.single("file"), postCtrl.createPost);
router.put("/:id", auth, upload.single("file"), postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.patch("/like-post/:id", auth, postCtrl.likePost);
router.patch("/unlike-post/:id", auth, postCtrl.unlikePost);

router.patch("/comment-post/:id", postCtrl.commentPost);
router.patch("/edit-comment-post/:id", postCtrl.editCommentPost);
router.patch("/delete-comment-post/:id", postCtrl.deleteCommentPost);

router.post(
  "/testupload",
  upload.single("file"),
  uploadController.uploadProfil
);

module.exports = router;
