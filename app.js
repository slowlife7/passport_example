const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const app = express();

const index = require("./api/index");
const auth = require("./api/auth");

const User = require("./model/user");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//public 자원 로드
app.use(express.static(path.join(__dirname, "public")));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: false })); //url 인코딩되어 req.
app.use(bodyParser.json()); //req.body json으로 파싱되어있음
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", index);
app.use("/auth", auth);

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "존재하지 않는 아이디입니다." });
      }
      return user.verifyPassword(password, (err, matched) => {
        if (matched) {
          return done(null, user);
        }
        return done(null, false, { message: "비밀번호 틀렸습니다." });
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = app;
