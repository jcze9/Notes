const helpers = {};
//isAuthenticated es una funcion de passpo...
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())//verifica que user este autentificado 
    {
        return next(); //continua con el codi..que viene
    }
    req.flash('error_msg', 'Not Authorizad is a views notes');
    res.redirect('/users/signin');
}
module.exports = helpers
//para proteger las rutas