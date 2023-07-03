const express = require('express')
const router = express.Router()
const {registerUser,loginUser, upload , imguploads} = require("../controllers/user");
const middleware = require("../middleware/user");
const fieldimg = require("../middleware/handle-upload");
const formidable = require('express-formidable');

router.post("/register",formidable(),[middleware,fieldimg],registerUser);
router.post("/login",loginUser);

module.exports = router;