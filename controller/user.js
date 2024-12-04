const { v4: uuidv4 } = require("uuid")
const User = require("../models/user")
const { setUser } = require("../service/auth")


async function userSignUp(req, res) {
    try {
        const { name, email, password } = req.body
        console.log(name)
        console.log(email)
        console.log(password)
        if(await User.findOne({email})){
            return res.status(409).send("User already exists");
        }
        await User.create({
            name,
            email,
            password
        })
        return res.redirect("/")
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email, password });

        if (!existingUser) {
            return res.render("login", {
                error: "Invalid Username or Password"
            });
        }
        const token = setUser(existingUser)
        res.cookie("token", token)
        // res.cookie("token", token,{
        //     domain: ".edugram.PK" //isko ab edugram.pk ki koi bhi subdomain access kr skti like coffeeshop.edugram.pk ya tund.edugram.pk
        // })
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}


module.exports = {
    userSignUp,
    userLogin
}