const express = require('express')
const router = express.Router()
const { verifyToken } = require('../controllers/user')
const { createPost, deletePost, updatePost, getPosts, getPost } = require('../controllers/post')

router.post("/create-post", verifyToken, createPost);
router.post("/delete-post", verifyToken, deletePost);
router.post("/update-post", verifyToken, updatePost);
router.get("/", verifyToken, getPosts);
router.get("/:id", verifyToken, getPost);


module.exports = router;