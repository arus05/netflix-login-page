const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body
    const user = await userModel.login(email, password)
    // create token and send it back
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {
      expiresIn: "5d"
    })
    res.json({email, token})
  }catch(err){
    res.status(401).json({error: err.message})
  }
}

const signupUser = async (req, res) => {
  try{
    const {email, password} = req.body
    const user = await userModel.signup(email, password)
    // create token and send it back
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {
      expiresIn: "5d"
    })
    res.json({email, token})
  }catch(err){
    res.status(401).json({error: err.message})
  }
}

module.exports = {
  loginUser,
  signupUser
}