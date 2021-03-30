const express = require("express");
const app = express();
var cors = require("cors");
const helmet = require("helmet");
const courseDetails = require("./lib/details");
const port = 3000;
app.use(helmet());
app.use(cors());

app.get("/", function (req, res) {
  return res.send("Hello world");
});

function myLogger(req, res, next) {
  console.log("LOGGED");
  next();
}
app.use(myLogger);
//get course details
app.get("/course/:name", async function (req, res) {
  let courseName = req.params.name;
  const data = await courseDetails.getDetails(courseName);
  // ad.push(data);
  res.send(data);
});

app.listen(process.env.PORT || port, function () {
  console.log("server started");
});
// course - unit - container - Studentsareviewing;
