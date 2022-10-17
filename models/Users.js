const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please Provide a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "Please Provide a Email"],
        unique:true,
        match:[
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please provide a valid email."
        ]

    },
    password:{
        type:String,
        required:[true, "Please Provide a Password"],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
   
    resetPasswordExpire:Date

}) 


userSchema.pre("save", async function(next){
    if( !this.isModified("password")  ){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await  bcrypt.hash( this.password, salt  )

}) 


userSchema.methods.matchedPassword = async function(password){
    
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken =  function(){
    
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,  {expiresIn: process.env.JWT_EXPIRE } )
    
}




const user = mongoose.model("users", userSchema )
module.exports = user