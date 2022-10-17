const user = require("../models/Users")
const ErrorResponse = require("../utils/ErrorResponse")
exports.register = async (req, res, next)=>{
   const {username, email, password} = req.body
   try{
    const cratedUser = await user.create({
        username, email, password 
    })

    res.status(201).json({
        success:true,
        cratedUser
    })

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
        return res.status(200).json({
            success:true,
            User
        })
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

