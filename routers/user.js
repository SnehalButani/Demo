const express = require('express')
const router = express.Router()
const { registerUser, loginUser, upload, imguploads } = require("../controllers/user");
const validateUser = require("../middleware/user");
const uploadImage = require("../middleware/handle-upload");
const formidable = require('express-formidable');

router.post("/register", formidable(), [validateUser, formidable({
    uploadDir: 'uploads/',
    keepExtensions: true,
}),uploadImage], registerUser);
router.post("/login", loginUser);

module.exports = router;