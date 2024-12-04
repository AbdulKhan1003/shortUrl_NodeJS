const express = require("express")
const {generateNewShortId, getAnalytics} = require("../controller/url")

const router = express.Router()

router.post("/",generateNewShortId)
router.get("/analytics/:shortId",getAnalytics)

module.exports = router