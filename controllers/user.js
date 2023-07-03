const { default: mongoose } = require("mongoose");
const { User, validate, validateLogin } = require('../modules/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const multer = require("multer");
const fs = require("fs");

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
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    // }
};

const loginUser = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    const userData = _.pick(user, ['_id', 'name', 'email'])
    res.send({ userData: { ...userData, token } });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.get('PrivateKey'), (err, user) => {
            if (err) { return res.status(403).json("Token is not valid!"); }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const fileFilter = (req, file, cb) => {
    console.log(req.fields);
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb('INVALID FILE!!!!', false);
    }
};

// const upload = multer({
//     limits: 1024 * 1024 * 5,
//     fileFilter: fileFilter,
//     storage: multer.diskStorage({
//         destination: (req, file, callback) => {
//             let path = `./uploads/img`;
//             if (!fs.existsSync(path)) {
//                 fs.mkdirSync(path);
//             }
//             callback(null, path);
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + '.jpg');
//         }
//     })
// });

// const imguploads = (req, res) => {
//     console.log(req.file);
//     if (req.file) {
//         Bucketupload(req.file.buffer)
//             .then((result) => {
//                 return res.status(200).json({
//                     msg: "Image upload successfully",
//                     imgURL: result
//                 });
//             })
//             .catch((err) => {
//                 res.status(400).json(err);
//                 console.log(err);
//             })
//     }
// };

module.exports = { registerUser, loginUser, verifyToken };