exports.register = (req, res, next)=>{
    res.send("Register Route")
}
exports.login = (req, res, next)=>{
    res.send("Login Route")
}
exports.forgetPassword = (req, res, next)=>{
    res.send("Forget Password Route")
}
exports.resetPassword = (req, res, next)=>{
    res.send("Reset Password Route")
}

