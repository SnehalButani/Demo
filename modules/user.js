const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:String
});

const model = mongoose.model("user",schema);
module.exports=model;
