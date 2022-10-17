require('dotenv').config({ path: './config.env' })
const express = require("express")
const connectDb = require("./config/db")
const errorHandler = require("./middlewares/error")
connectDb()
const app = express()
app.use(express.json())
const port = process.env.PORT || 5050
app.use("/api/auth", require("./routes/auth") )
//Error handler should be last piece of middleware
app.use(errorHandler)
const server = app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`);
})
process.on("unhandledRejection", (err, promise)=>{
    console.log(`Logged Error ${err}`)
    server.close(() => process.exit(1)  )
})