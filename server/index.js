const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
 const cors = require('cors')
 var passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path"); 

// --------------connect to mongoDB--------------
mongoose.set("useCreateIndex", true); //for warning
main().catch((err) => console.log(err));
// ------- End MongoDB 

const app = express();

app.use(cors({
  origin: ["https://localhost:3000","http://localhost:3000","*"], // <-- location of the react app were connecting to
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----------------Middleware------------------

app.use(
  session({
    secret: "cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
  })
);

app.use(cookieParser("secretcode")); 
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use(express.static("build"));
app.use(express.static(path.resolve(__dirname, "./build")));
app.use(express.static("uploads"));
app.use(express.static(path.resolve(__dirname, "./uploads")));
 
// app.use('/uploads', express.static('uploads'));

const SignInUpRoutes = require('./routes/signin-up');
const AffilationRoutes = require('./routes/affilation_routes');
app.use('/api',SignInUpRoutes);
app.use('/api',AffilationRoutes);

app.get("/*", function (req, res) {
  res.sendFile(
    path.resolve(
      __dirname,
      "./build/index.html"
    ),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
//---------------------------------
const PORT = process.env.PORT || 8073;
app.listen(PORT, () => {
  console.log("server runing on port" + PORT);
});



async function main() {
    await mongoose.connect(
      process.env.MONGO , 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => { 
        console.log("MongoDB-connected");
      }
    );
  }
 