//modulos
const express = require("express");
const exprehbs = require("express-handlebars");
const paht = require("path");
const methoOverride = require("method-override"); //procesa las peticiones
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
//Initializati
const app = express();
require("./config/passport");
//Settings
app.set("port", process.env.PORT || 4343);
app.set("views", paht.join(__dirname, "views"));
app.engine(
  ".hbs",
  exprehbs({
    defaultLayout: "main",
    layoutsDir: paht.join(app.get("views"), "layouts"),
    partialsDir: paht.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs"); //mator de plantilla

//Middlawares (funciones que se ejecutan al llegar las peticiones)
app.use(express.urlencoded({ extended: false })); //recibe los datos en formato json
app.use(methoOverride("_method"));
app.use(
  session({
    secret: "se",
    resave: true,
    saveUninitialized: true
  })
);

//el initialize es una funcion de passport (el modulo npm)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global Variables
app.use((req, res, next) => {
  //el que viene despues de locals se puede se puede cambiar es la variable
  res.locals.succes_msg = req.flash("succes_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null; //guarda el usuario que inicio session
  next();
});
//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
app.use(require("./routes/users.routes"));
//Static files
app.use(express.static(paht.join(__dirname, "public")));
module.exports = app; //se exportar el app
