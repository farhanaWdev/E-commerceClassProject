const AllUser = require('../models/userSchema')

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

let registrationController = async(req,res)=>{
    const{Fullname ,email,password ,confirmPassword,terms}=req.body

    let existingUser = await AllUser.findOne({email:email})

        if(!Fullname || !email || !password || !terms){
            return res.status(400).json({
              success:false,
              message:"To Process Furthur , Please Fill all the Fields "
        })
    }

        if(password !== confirmPassword){
            return res.status(400).json({
              success:false,
              message:"Password Mismatch "
        })
    }

         if(!EmailRegex.test(email)){
            return res.status(400).json({
              success:false,
              message:"Please Enter a valid Email ! "
        })            
    }

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
        password:password,
        terms:terms
      })
await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully!"
        });}


module.exports = { registrationController }