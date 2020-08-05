const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertMessage", "Session telah habis silankah login kembali!");
    req.flash("alertStatus", "danger");
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = isLogin;
