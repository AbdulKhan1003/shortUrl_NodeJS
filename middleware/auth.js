const { getUser } = require("../service/auth")


function checkForAuthentication(req,res,next){ //This is Authentication
    const tokenCookie = req.cookies?.token
    req.user = null
    if(!tokenCookie)
        return next()
    
    const user = getUser(tokenCookie)
    req.user = user
    return next()
}

function restrictTo(roles = []){ //This is Authorization
    return function (req,res,next){
        if(!req.user){ 
            return res.redirect("/login")
    }
    if(!roles.includes(req.user.role)){
        return res.end("UnAuthorized")
    }
    return next()
}
}

// function restrictToLoggedInUserOnly(req,res,next){
//     const userId = req.headers["authorization"]
//     console.log("userID",userId)
//     if(!userId){
//         return res.redirect("/login")
//     }
//     const token = userId.split("Bearer ")[1]
//     const user = getUser(token)
//     if(!user){
//         return res.redirect("/login")
//     }
//     req.user = user
//     next()
// }

// async function checkAuth(req,res,next) {
//     const userId = req.headers["authorization"]
//     const token = userId.split("Bearer ")[1]
//     const user = getUser(token)
//     req.user = user
//     next()
// }

module.exports={
    checkForAuthentication,
    restrictTo     
}