const router = require("express").Router();
const { test, register, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
