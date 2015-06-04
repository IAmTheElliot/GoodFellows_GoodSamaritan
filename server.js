var express = require("express");
var moment = require("moment");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/Public"));

app.get("/secret", function(req, res) {
  var secret = process.env.SECRET || "We're actually Bad Samaritans.";

  console.log(secret);
  res.send(secret);
})

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
})
