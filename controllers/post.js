const { default: mongoose } = require("mongoose");
const { Post, validate } = require('../modules/post');
const _ = require('lodash');
const config = require('config');
const { User } = require('../modules/user');
const multer = require('multer');

const createPost = async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Insert the new post if they do not exist yet
    let post = new Post(_.pick(req.body, ['name', 'description']));
    post.createdBy = req.user._id;

    await post.save();
    // const user = await User.findOne({_id: post.createdBy}).populate('createdBy').exec();
    // console.log(user);
    let newPost = await Post.findById(post.id).populate("createdBy",['name','_id','email']).exec();
    res.send(newPost);
};

module.exports = { createPost};