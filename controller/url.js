const URL = require("../models/url")
const shortid = require("shortid")

async function generateNewShortId(req,res) {
    try{
    const body = req.body
    console.log(req.body)
    if(!body.url){
        return res.status(400).json({error : "URL is required"})
    }
    const shortID = shortid()
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    // return res.status(200).json({id: shortID})
    return res.render("home",{
        id:shortID
    })
}catch(error){
    return res.status(500).json({error : error})
}
}

async function getAnalytics(req,res) {
    const shortId = req.params.shortId
    console.log("Shoet",shortId)
    const result = await URL.findOne({shortID:shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
module.exports = {
    generateNewShortId,
    getAnalytics
}