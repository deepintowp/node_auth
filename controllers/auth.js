const crypto = require("crypto")
const user = require("../models/Users")
const ErrorResponse = require("../utils/ErrorResponse")
const sendMail = require("../utils/sendEmail")
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
exports.forgetPassword = async (req, res, next)=>{
    const {email} = req.body
    
    try {
        const findUser = await user.findOne({email})
        
        if(!findUser) return next(new ErrorResponse("Email Could not sent.", 404))
        const resetToken = findUser.getResetPasswordToken()
        await findUser.save()
        const resetUrl = `${process.env.FRONTEND_URL}/passwordreset/${resetToken}`
        
        const message = `
        <h1 >You have requrested password reset</h1>
        <p>Please go to this link to reset password</p>
        <a href='${resetUrl}' clicktracking='off'  >${resetUrl}</a> 
        `

        try {
            
            await sendMail({
                to:findUser.email, 
                subject:"Password Reset",
                text: message
            }) 
            return res.status(200).json({
                success:true,
                data:"Email sent"
            })

        } catch (error) {
            findUser.resetPasswordToken = undefined
            findUser.resetPasswordExpire = undefined
            await findUser.save()
            return next(new ErrorResponse("Email Could not sent.", 500))
        }

    } catch (error) {
        next(error)
    }
    
}
exports.resetPassword = async (req, res, next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")
    try {
        const findUser = await user.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })
        console.log(req.params.resetToken);
        console.log(resetPasswordToken);
        
        if(!findUser) return next(new ErrorResponse("Invalid reset token", 400))
        findUser.password = req.body.password
        findUser.resetPasswordToken=undefined
        findUser.resetPasswordExpire=undefined
        await findUser.save()
        return res.status(201).json({
            success:true,
            data:"Password reset success"
        })
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res)=>{
    const token = user.generateToken()
    return res.status(statusCode).json({
        success:true,
        token:token
    })
}