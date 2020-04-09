//se definie un objecto que contendra dos funciones
const indexCtrl = {}; //el indexCtrl se puede cambiar ( el objecto de la izquierda)
indexCtrl.renderIndex = (req, res) => {
  res.render("index");
};
indexCtrl.renderAbout = (req, res) => {
  res.render("about");
};
module.exports = indexCtrl;
