const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

userSchema.statics.signup = async function(email, password){
  /*--------------Email and password validation--------------*/
  if(!email || !password){
    throw new Error("Email and password must be filled")
  }

  if(!validator.isEmail(email)){
    throw new Error("Invalid email")
  }

  if(await this.findOne({ email })){
    throw new Error("Email already in use")
  }

  if(!validator.isStrongPassword(password)){
    throw new Error("Password not strong enough")
  }
  /*--------------Email and password validation--------------*/

  /*--------------Encrypting the password--------------*/
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  /*--------------Encrypting the password--------------*/

  /*--------------Create new user--------------*/
  const newUser = await this.create({
    email,
    password: hash
  })

  if(!newUser){
    throw new Error("Failed to create new user")
  }

  return newUser
  /*--------------Create new user--------------*/
}

userSchema.statics.login = async function(email, password){
  if(!email || !password){
    throw new Error("Email and password must be filled")
  }

  if(!validator.isEmail(email)){
    throw new Error("Invalid email")
  }

  const user = await this.findOne({ email })

  if(!user){
    throw new Error("Invalid email")
  }

  if(!(await bcrypt.compare(password, user.password))){
    throw new Error("Incorrect password")
  }

  return user

}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel