const { Router } = require("express");
const router = Router();
const {
  renderSignupForm,
  renderSiginiForm,
  signin,
  signup,
  logout,
} = require("../controllers/users.controller");
router.get("/users/signup", renderSignupForm);
router.post("/users/signup", signup);
router.get("/users/signin", renderSiginiForm);
router.post("/users/signin", signin);
router.get("/users/logout", logout);
module.exports = router;
