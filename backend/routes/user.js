const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.ctr_post_signup);
router.post('/login', userCtrl.login);
router.get('/me', userCtrl.getMyId)
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/:id/count', userCtrl.getAllCountByUser);


module.exports = router;
