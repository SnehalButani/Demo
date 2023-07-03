const express = require("express")
const fs = require("fs");
const formidable = require("formidable");

module.exports = function (req, res, next) {
    var form = new formidable.IncomingForm(); 
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          status: "Failure",
          msg: "Some error occured " + err.message,
        });
      }
      let oldPath = img.path;
      let newPath = `./uploads/${files.nameOfTheField.name}`;
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return res.status(400).json({
            status: "Failure",
            msg: "Failed to upload file. " + err.message,
          });
        }
        res.status(201).json({
          status: "Success", 
          msg: "File uploaded successfully"
        });
      });
    });
    next();
}