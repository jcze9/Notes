const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, async (email, password, done) => {
  //Match email e user
  const user = await User.findOne({ email: email });
  if (!user) {
    return done(null, false, { message: "Not Email Foud" });
  } else {
    //Match password
    const match = await user.matchPassword(password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect Password" });
    }
  }
}));
//se puede agregar mas comprobaciones pero esta bien para empezar
//para guardar la sesion
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//para cerrar session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
