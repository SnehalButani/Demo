const express = require('express')
const router = express.Router()
const {verifyToken} = require('../controllers/user')
const {createPost} = require('../controllers/post')

router.post("/createPost", verifyToken ,createPost);

module.exports = router;