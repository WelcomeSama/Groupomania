const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.post("/signup", userCtrl.ctr_post_signup);
router.post("/login", userCtrl.ctr_post_login);
router.get("/get-all-user", userCtrl.ctr_get_all_user);
router.get("/get-user/:id", userCtrl.ctr_get_user);
router.delete("/delete-user/:id", userCtrl.ctr_delete_user);
router.put("/edit-user/:id", userCtrl.ctr_put_edit_user);

module.exports = router;
