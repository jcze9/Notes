const userCtrl = {};
const passport = require('passport')
const User = require("../models/User");
userCtrl.renderSignupForm = (req, res) => {
  res.render("users/signup"); //carga el fomrulario de registro
};
userCtrl.signup = async (req, res) => {
  const { email, user, password, confirm_password } = req.body;
  const errors = [];
  if (password == user) {
    errors.push({ text: "User is match password" }); //la clave no tiene que se igual user
  }
  if (password != confirm_password) {
    errors.push({ text: "Password do no match" }); //el con el comdando push insertamos algo en el array
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      email
    });
  } else {
    // va a comprobar si ya existe  el correo
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "Then email is Already in use");
      res.redirect("/users/signup");
    }
    else {
      const newUser = new User({ user, email, password });
      newUser.password = await newUser.encryptPassword(password); //cifra la clave
      //el suces_msg es el nombre de la variable que va tener el msj
      req.flash("succes_msg", "You are registered");
      await newUser.save();
      res.redirect("/users/signin");
    }
  }
};
userCtrl.renderSiginiForm = (req, res) => {
  res.render("users/signin"); //carga el formulario de iniciar session
};
userCtrl.signin = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true
});
userCtrl.logout = (req, res) => {
  req.logout();//cerrar session
  req.flash('succes_msg', 'You are logged out now.');
  res.redirect('/users/signin');
};
module.exports = userCtrl;
