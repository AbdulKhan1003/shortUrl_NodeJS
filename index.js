const express = require("express")
const {DBconnection} = require("./connection")
const URL = require("./models/url")
const path = require("path")
const cookieParser = require("cookie-parser")
const { checkForAuthentication, restrictTo } = require("./middleware/auth")

// Routes
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const app = express()
const PORT = 8001

DBconnection("mongodb://localhost:27017/short-url").then(()=>{console.log("MongoDB connected")})   

app.set("view engine", "ejs")
app.set("home",path.resolve("../views"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication) //har dfa hogi hi chk

app.use("/url",restrictTo(["NORMAL","ADMIN"]) , urlRoute)
app.use("/user",userRoute)
app.use("/",staticRoute)

app.get("/url/:shortId", async(req, res) => {
    try {
        const shortId = req.params.shortId;
        
        const entry = await URL.findOneAndUpdate(
            { shortID: shortId },  // Notice the correct field name: `shortID`
            { $push: { visitHistory: { timestamp: Date.now() } } },
        );

        if (!entry) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(PORT, ()=>{ console.log(`Server running on PORT:${PORT}`)})