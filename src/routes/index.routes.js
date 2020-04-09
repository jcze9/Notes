const { Router } = require("express");
//con los corchetes se llama a las funciones del controller de index
const { renderIndex, renderAbout } = require("../controllers/index.controller");
const router = Router(); // router se puede cambiar de nombre
router.get("/", renderIndex);
router.get("/about", renderAbout);
module.exports = router;
