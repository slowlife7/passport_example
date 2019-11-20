const index = (req, res, err) => {
  if (!req.user) {
    res.redirect("/auth");
    return;
  }

  res.render("index", { user: req.user });
};

module.exports = {
  index
};
