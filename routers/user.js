const express = require('express')
const router = express.Router()
const {registerUser,loginUser, upload , imguploads} = require("../controllers/user");
const usercheck = require("../middleware/user");
const fieldimg = require("../middleware/handle-upload");
const formidable = require('express-formidable');

router.post("/register",formidable(),[usercheck,fieldimg],registerUser);
router.post("/login",loginUser);

module.exports = router;