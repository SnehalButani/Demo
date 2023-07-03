const express = require('express')
const router = express.Router()
const { registerUser, loginUser, upload, imguploads } = require("../controllers/user");
const formidable = require('express-formidable');

router.post("/register", formidable(), registerUser);
router.post("/login", loginUser);

module.exports = router;