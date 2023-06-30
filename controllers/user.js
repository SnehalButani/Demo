const { default: mongoose } = require("mongoose");
const user = require("../modules/user");


const gtdata = (req,res)=>{

    const name = new user({
        name:"snehal"
    });

    name.save();
};

module.exports = {gtdata};