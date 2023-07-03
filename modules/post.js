const Joi = require('joi');
const mongoose = require("mongoose");

const Post = mongoose.model('Post', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
}));

function validatePost(req) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(req);
}

exports.Post = Post;
exports.validate = validatePost;
