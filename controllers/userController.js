const UserModel = require("../models/userModel")
const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Cookies = require('js-cookie')

exports.registerController = async (req,res) =>{
    
    try {
        const {username,password} =  req.body
        const hashedPassword = await bcrypt.hash(password,8)
        const newUser = await UserModel.create({username,password:hashedPassword})
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

exports.loginController = async (req,res) =>{
    try {
        const {username,password} =  req.body
        const user = await UserModel.findOne({username:username})
        if(!user){
            throw new Error("invalid user")
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            throw new Error("invalid password")
        }
        console.log(match);
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        user.tokens =user.tokens.concat({token})
        await user.save()
        const userObj = {...user.toObject()}
        delete userObj.password
        delete userObj.tokens
        res.status(200).send({userObj,token})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

exports.logoutHandler = async (req,res) => {
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send("you are logged out")
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}