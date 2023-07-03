const express = require('express')
const router = express.Router()
const { registerUser, loginUser, upload, imguploads } = require("../controllers/user");



router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;