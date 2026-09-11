const AllUser = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verificationEmail} = require('../utils/emailSender')
const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

let registrationController = async(req,res)=>{
    const{Fullname ,email,password ,confirmPassword,terms}=req.body

    let existingUser = await AllUser.findOne({email:email})

        if(existingUser){
            return res.status(400).json({
              success:false,
              message:"Email Already Exists "
        })         
    }

        if(!Fullname || !email || !password || !terms){
            return res.status(400).json({
              success:false,
              message:"To Process Furthur , Please Fill all the Fields "
        })
    }
    
         if(!EmailRegex.test(email)){
            return res.status(400).json({
              success:false,
              message:"Please Enter a valid Email ! "
        })            
    }

        if(password !== confirmPassword){
            return res.status(400).json({
              success:false,
              message:"Password Mismatch "
        })
    }

    const hash = bcrypt.hashSync(password, 10);


    //      if(!PasswordRegex.test(password)){
    //         return res.status(400).json({
    //           success:false,
    //           message:"Password must contain at least one uppercase letter, one number, and one special character"
    //     })            
    // }

    // ---sudu bad request ashtese FUCKK ---gotta change this regex !!!!!!!

      const user = new AllUser({
        Fullname:Fullname,
        email:email,
        password:hash,
        terms:terms
      })


    // checking email verification
    let verificationToken = jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    },'abcdefgh',{
        expiresIn:'10d'
    })

    verificationEmail(email,verificationToken)

    await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully!"
        });
    }

let loginController = async(req,res)=>{
    const{email,password}=req.body
    const existingUser = await AllUser.findOne({email})
    if(!email){
        return res.status(400).json({
            success:false,
            message:"Register a New Account"
        })
    }
    if(!email || !password){
        return res.status(400).json({
        success:false,
        message:"Please fill all the fields"
        })

    }

  

}



module.exports = { registrationController , loginController }