const user = require("../models/Users")
const ErrorResponse = require("../utils/ErrorResponse")
exports.register = async (req, res, next)=>{
   const {username, email, password} = req.body
   try{
    const cratedUser = await user.create({
        username, email, password 
    })

    return sendToken(cratedUser, 201, res)

   }catch(error){
    next(error)
   }
}
exports.login = async (req, res, next)=>{
    const {email, password} = req.body 
    
    if(!email || !password) {
       
       return next(new ErrorResponse("Please provide Email and password.", 400))
        
    }
    
    try{
        const User = await user.findOne({email}).select("+password")
       console.log(User);
        if(!User) {
            
             return next(new ErrorResponse("Invalid credential", 401))
        }
        
        const isMatched = await User.matchedPassword(password)
        
        
        if(!isMatched) {
             
             return next(new ErrorResponse("Invalid credential", 401))
        }
        return sendToken(User, 200, res)
    }catch(error){
        return res.status(500).json({success:false, error: error.message})
    }
}
exports.forgetPassword = (req, res, next)=>{
    res.send("Forget Password Route")
}
exports.resetPassword = (req, res, next)=>{
    res.send("Reset Password Route")
}

const sendToken = (user, statusCode, res)=>{
    const token = user.generateToken()
    return res.status(statusCode).json({
        success:true,
        token:token
    })
}