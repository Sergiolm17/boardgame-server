var express = require("express");
var router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

module.exports = router;
