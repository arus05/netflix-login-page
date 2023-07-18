require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")

const userRouter = require("./routers/userRouter.js")

// create server
const app = express()
app.use(express.json())
app.use("/api/user", userRouter)

// connect to database and listen to port
async function connectDB(){
  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }catch(err){
    console.log(err)
  }
}

connectDB()
  .then(() => {
    console.log("connected to database...")
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })





