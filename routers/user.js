const express = require('express')
const router = express.Router()
const {gtdata} = require("../controllers/user");


router.post("/",gtdata);

module.exports = router;