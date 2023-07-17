require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")

// create server
const app = express()
app.use(express.json())

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
    app.listen(process.env.PORT_NUMBER, () => {
      console.log("Listening on port " + process.env.PORT_NUMBER)
    })
  })
  .catch((err) => {
    console.log(err)
  })





