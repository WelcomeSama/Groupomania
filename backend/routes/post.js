const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', postCtrl.LikePost);

router.post('/:id/comment', commentCtrl.createComment);
router.get('/:id/comment', commentCtrl.getAllCommentByPost);
router.delete('/comment/:id', commentCtrl.deleteComment);

module.exports = router;