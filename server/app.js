require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const { DB_USER, DB_PASS } = process.env;

const url = `mongodb://${DB_USER}:${DB_PASS}@ds159400.mlab.com:59400/cwitter`;

mongoose.connect(url).then(()=> {
  console.log('connected to db')
});

app.use("/", indexRouter);
app.use("/post", postRouter);

app.listen(3000, () => {
  console.log("listening in port 3000");
});
