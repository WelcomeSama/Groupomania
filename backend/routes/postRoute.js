const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const postCtrl = require("../controllers/postController");

router.get("/", postCtrl.readPost);
router.post("/", upload.single("file"), postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unlikePost);

router.patch("/comment-post/:id", postCtrl.commentPost);
router.patch("/edit-comment-post/:id", postCtrl.editCommentPost);
router.patch("/delete-comment-post/:id", postCtrl.deleteCommentPost);

module.exports = router;
