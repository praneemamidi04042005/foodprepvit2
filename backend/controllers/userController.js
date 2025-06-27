const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const createToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_TOKEN_SECRET
    )
}
const loginUser = async (req, res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user)
            return res.status(400).json({"message":"Invalid Email or Password"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(400).json({"message":"Invalid Email or Password"})

        const token = createToken(user._id)
        res.status(200).json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"Internal Server Error"})
    }
}
const registerUser = async (req, res) => {
    const {name,password,email} = req.body
    try {
        const exists = await userModel.findOne({email})
        if(exists)
            return res.status(400).json({"message":"Email already exists"})

        if(!validator.isEmail(email))
            return res.status(400).json({"message":"Invalid E-mail"})

        if(password.length < 8)
            return res.status(400).json({"message":"Password must be at least 8 characters long"})

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = userModel.create({name,email,password:hashedPassword})
        //const token = createToken(user._id)
        res.status(201).json({"message":"User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"Internal Server Error"})
    }
}

module.exports = {
    loginUser,
    registerUser
}