const { User, validate, validateLogin } = require('../modules/user');
module.exports =  async function (req,res,next) {
    console.log(req.fields)
    const { error } = validate(req.fields);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.fields.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    }
    next();
}