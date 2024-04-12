var express = require("express");
var router = express.Router();
var Phone = require("../models/Phone");

/* GET phones listing. */

router.get("/", (req, res, next) => {
  Phone.find()
    .then((foundPhones) => {
      console.log("Here are all the phones ==>", foundPhones);
      res.json(foundPhones);
    })
    .catch((error) => {
      console.log("Error getting all phone data", error);
      res.json({ errorMessage: "Error retrieving all phone data", error });
    });
});

/* GET specific phone details. */

router.get("/:phoneId", (req, res, next) => {
  Phone.findById(req.params.phoneId)
    .then((specificPhone) => {
      console.log("Here is the specified phone ==>", specificPhone);
      res.json(specificPhone);
    })
    .catch((error) => {
      console.log("Error getting specified phone data", error);
      res.json({
        errorMessage: "Error retrieving specified phone data",
        error,
      });
    });
});
module.exports = router;
