const express = require("express");
var cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const axios = require('axios')
const { requireAuth } = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(cookieParser())
app.get('/', (req, res) => {
  res.json('Got you')
})

app.post("/protected", requireAuth);
app.listen(process.env.PORT, () => {
  console.log("app running on " + process.env.PORT);
});

app.use(authRoutes);
app.use("/admin", adminRoutes);


setInterval(() => {
  axios.get('https://braxtr.onrender.com/').then(resp => {

    console.log(resp.data);
  }).catch((err) => {
    console.log({ err })
  });
}, 780000);

//PASSWORD minimum length
