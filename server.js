const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const blogRoutes = require("./routes/route");
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const session=require("express-session");
// require("./middileware/passport");
// const MongoStore = require("connect-mongo");
// const authRoutes = require("./routes/authRoutes");

mongoose.connect("mongodb://127.0.0.1:27017/blogdata")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error connecting to mongodb", err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to handle JSON payloads

app.use("/uploads", express.static("uploads"));
// Register your routes
app.use("/api", blogRoutes);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "mysecret", // Change to a strong secret in production
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
//       secure: false, // Set to `true` if using HTTPS
//       httpOnly: true, // Prevents XSS attacks
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
