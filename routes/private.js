const express = require("express")
const router = express.Router()
const { getPrivatedata  } = require("../controllers/private")
const { protect } = require("../middlewares/auth")
router.route("/").get(protect, getPrivatedata)

module.exports = router