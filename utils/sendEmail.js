const nodeMailer = require("nodemailer")

const sendMail = (options)=>{
    // console.log(process.env.EMAIL_SERVICE)
    // console.log(process.env.EMAIL_USERNAME)
    // console.log(process.env.EMAIL_PASSWORD)
    // console.log(process.env.EMAIL_FROM)
    // console.log(options.to)
    // console.log(options.subject)
    // console.log(options.text)
    const transpoter = nodeMailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD,

        }
    })

    const emailOption = {
        from:process.env.EMAIL_FROM,
        to:options.to,
        subject:options.subject,
        html:options.text

    }
   
    transpoter.sendMail(emailOption, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log(info)
        }

    })
}
module.exports = sendMail