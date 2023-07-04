const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser, verifyToken } = require("../controllers/user");
const validateUser = require("../middleware/user");
const uploadImage = require("../middleware/handle-upload");
const formidable = require('express-formidable');

router.post("/register", formidable(), [validateUser], registerUser);
router.post("/login", loginUser);
router.post("/update-user", verifyToken, updateUser);

module.exports = router;