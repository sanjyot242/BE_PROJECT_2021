var express = require("express");
var app = express();
var port = 3000;
upload = require("express-fileupload");
const bodyParser = require("body-parser");
var fs = require("fs");

app.use(upload());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  if (req.files) {
    console.log(req.files);
    var file = req.files.filename,
      filename = file.name;

    file.mv("./upload/" + filename, function (err) {
      if (err) {
        console.log(err);
        res.send("error occured");
      } else {
        res.send("File uploded");
      }
    });
  }
});

app.post("/save", function (req, res) {
  let data = req.body.textfield;
  res.send("text:" + data);
  console.log(data);
  var writeStream = fs.createWriteStream("myfile.txt");
  writeStream.write(data);
  writeStream.end();
});
