const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.get("/get-user", userCtrl.ctr_get_user);

module.exports = router;
