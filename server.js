require('dotenv').config({ path: './config.env' })
const express = require("express")
const app = express()
app.use(express.json())
const port = process.env.PORT || 5050
app.use("/api/auth", require("./routes/auth") )

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`);
})