const express = require("express")
const router = express.Router()
const { register, login, forgetPassword, resetPassword  } = require("../controllers/auth")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forgetPassword").post(forgetPassword)
router.route("/resetPassword/:resetToken").put(resetPassword)
module.exports = router