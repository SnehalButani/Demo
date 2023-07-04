const { default: mongoose } = require("mongoose");
const { Post, validate } = require('../modules/post');
const _ = require('lodash');
const { success, errorResponse } = require("../helpers/responseApi");

const createPost = async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(errorResponse(error.details[0].message, res.statusCode));
    }
    let post = new Post(_.pick(req.body, ['name', 'description']));
    post.createdBy = req.user._id;

    await post.save();
    // const user = await User.findOne({_id: post.createdBy}).populate('createdBy').exec();
    // console.log(user);
    let newPost = await Post.findById(post.id).populate("createdBy", ['name', '_id', 'email']).exec();
    res.status(201).send(success("New Post Created", newPost, res.statusCode));
};

const deletePost = async (req, res) => {
    let post = await Post.findOne({ _id: req.body.id });
    if (!post) {
        return res.status(400).send(errorResponse("Post not found", res.statusCode));
    }
    await Post.deleteOne({ _id: req.body.id });

    res.status(200).send(success("Post deleted successfully", {}, res.statusCode));
};

const updatePost = async (req, res) => {
    let post = await Post.findOne({ _id: req.body.id });
    if (!post) {
        return res.status(400).send(errorResponse("Post not found", res.statusCode));
    }
    let updatedPost = new Post(_.pick(req.body, ['name', 'description']));
    await Post.updateOne({ _id: req.body.id }, {
        $set: {
            name: updatedPost.name,
            description: updatedPost.description
        }
    });
    post = await Post.findOne({ _id: req.body.id }).populate("createdBy", ['name', '_id', 'email']).exec();
    res.status(200).send(success("Post updated successfully", post, res.statusCode));
};

const getPost = async (req, res) => {
    let posts = await Post.findOne({ _id: req.params.id }).populate("createdBy", ['name', '_id', 'email']).exec();
    res.status(200).send(success("Post fetched successfully", posts, res.statusCode));
};


const getPosts = async (req, res) => {
    let posts = await Post.find().populate("createdBy", ['name', '_id', 'email']).exec();
    res.status(200).send(success("Posts fetched successfully", posts, res.statusCode));
};


module.exports = { createPost, deletePost, updatePost, getPosts,getPost };