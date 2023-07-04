const { default: mongoose } = require("mongoose");
const { User, validate, validateLogin } = require('../modules/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const { success, errorResponse } = require("../helpers/responseApi");

const registerUser = async (req, res) => {
    user = new User(_.pick(req.fields, ['name', 'email', 'password']));
    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    res.status(201).header('x-auth-token', token).send(success("Registered Successfully", _.pick(user, ['_id', 'name', 'email']), res.statusCode));
    // }
};

const loginUser = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(errorResponse(error.details[0].message, res.statusCode));
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send(errorResponse('Incorrect email or password.', res.statusCode));
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send(errorResponse('Incorrect email or password.', res.statusCode));
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    const userData = _.pick(user, ['_id', 'name', 'email'])
    res.status(200).send(success("Login Successfully", { ...userData, token }, res.statusCode));
};

const updateUser = async (req, res) => {
    let userId = req.user._id;
    let user = await User.updateOne({ _id: userId }, {
        $set: {
            name: req.body.name
        }
    });
    user = await User.findOne({ _id: userId });
    const userData = _.pick(user, ['_id', 'name', 'email'])
    res.status(200).send(success("Profile Updated Successfully", userData, res.statusCode));
}

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.get('PrivateKey'), async (err, user) => {
            if (err) { return res.status(403).json(errorResponse("Token is not valid!", res.statusCode)); }
            req.user = user;
            user = await User.findOne({ _id: user._id });
            if (!user) {
                return res.status(401).json(errorResponse("You are not authenticated!", res.statusCode));
            }
            next();
        });
    } else {
        return res.status(401).json(errorResponse("You are not authenticated!", res.statusCode));
    }
};

module.exports = { registerUser, loginUser, updateUser, verifyToken };