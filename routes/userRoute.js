const express = require("express")
const { registerController, loginController, logoutHandler } = require("../controllers/userController")
const { verifyToken } = require("../middleware/verifyToken")
const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/logout",verifyToken, logoutHandler)


module.exports = router