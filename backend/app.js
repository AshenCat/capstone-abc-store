let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let createError = require("http-errors");
require("dotenv").config();

mongoose
  .connect(process.env.DB_REMOTE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Successfully connected to the database.`);
  })
  .catch((error) => {
    console.log(error);
  });

const lobbyRoute = require("./routes/route-map");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use("/api", lobbyRoute);

app.listen(process.env.PORT, () => {
  console.log("Connected to port " + process.env.PORT);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
