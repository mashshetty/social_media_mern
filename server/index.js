const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const route = require("./routes/route.js")
const post = require("./routes/post.js")
const app = express();

const cors = require('cors'); 

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
 app.use(express.json());


const port = 5001;
app.use(cors());


app.get("/", (req, res) => {
    res.send("server is set!!");
  });


  const DB = "mongodb+srv://mashshetty:mashshetty@muls.mskapn3.mongodb.net/?retryWrites=true&w=majority"

  
mongoose
.connect(DB)
.then(() => console.log("database connected"))
.catch((err) => {
  console.log(err);
});


app.use("/",route);
app.use("/post",post);

app.listen(port, () => {
    console.log("server is on!!");
  });
  
