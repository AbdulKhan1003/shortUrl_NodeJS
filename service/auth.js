// const sessionIdToUserMap = new Map() old way
const jwt = require('jsonwebtoken')
const secret = "Abdul@Khan_111"

function setUser(user) {
    // sessionIdToUserMap.set(id, user) dont need id so removed as param
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    },secret)
} 

function getUser(token){
    if(!token) return null
    try{
        return jwt.verify(token, secret)
    }
    catch(error){
        return null
    }
}

module.exports = {
    setUser,
    getUser
}