const passport = require("passport");
const user = require("../../model/user");

const authenticate = passport.authenticate("local", {
  failureRedirect: "/auth",
  failureFlash: true
});

const login = function(req, res, next) {
  res.redirect("/");
};

const show = function(req, res, next) {
  res.render("login", {
    error: { message: req.flash("error") }
  });
};

const destroy = function(req, res, next) {
  req.logout();
  res.redirect("/auth");
};

module.exports = {
  authenticate,
  login,
  show,
  destroy
};
