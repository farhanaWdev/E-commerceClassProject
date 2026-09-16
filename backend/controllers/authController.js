const AllUser = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verificationEmail, forgotPasswordEmail} = require('../utils/emailSender')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let registrationController = async(req,res)=>{
    const{fullname ,email,password ,confirmPassword,terms}=req.body

    let existingUser = await AllUser.findOne({email:email})

        if(existingUser){
            return res.status(400).json({
              success:false,
              message:"Email Already Exists "
        })         
    }

        if(!fullname || !email || !password || !terms){
            return res.status(400).json({
              success:false,
              message:"To Process Furthur , Please Fill all the Fields "
        })
    }
    
         if(!emailRegex.test(email)){
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

    if(!passwordRegex.test(password)){
        return res.status(400).json({
            sucess:false,
            message:"Use a proper Password"
        })
    }
      const user = new AllUser({
        fullname:fullname,
        email:email,
        password:hash,
        terms:terms
      })

    // checking email verification
    let verificationToken = jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    },process.env.JWT_VERIFY_SECRET,{
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
    if(!existingUser){
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

 let passCompare = bcrypt.compareSync(password, existingUser.password)
   if(passCompare){
    let accessToken = jwt.sign({
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
    },process.env.JWT_VERIFY_SECRET,{
        expiresIn:'40d'
    })
    return res.status(200).json({
        sucess:true,
        message: "You logged in succesfully",
        data: {
          _id: existingUser._id,
           fullName: existingUser.fullName,
           email: existingUser.email,
           role: existingUser.role,
       },accessToken : accessToken
    })
   }else  
     return res.status(400).json({
        sucess:true,
        message: "Password didn't match",
    })
    }

let verifyEmailController =  async(req,res)=>{
    let {token} = req.params

    var decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

    await AllUser.findByIdAndUpdate({_id:decoded._id} , {isVerified:true})
     res.status(200).json({
        sucess:true,
        message: "Email verified",
    })
}

let forgotPasswordController = async (req,res)=>{

    let{email}= req.body

    let existingUser = await AllUser.findOne({email:email})

      if(!existingUser){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }

        let forgotPassToken = jwt.sign({
        _id: existingUser._id,
        email: existingUser.email,
    },process.env.JWT_VERIFY_SECRET,{
        expiresIn:'10d'
    })

    res.status(200).json({
    success: true, 
    message: "Forgot Password Link has been sent to your Email"
    })

}

let ResetPasswordController = async (req,res)=>{

    let{token}= req.params
    let{newPassword,confirmPassword}= req.body

    var decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

     if(decoded){
        if(newPassword === confirmPassword){
            const hash = bcrypt.hashSync(newPassword,10);
            await AllUser.findByIdAndUpdate({_id:decoded._id},{password:hash})
              
     }else{
           return res.status(400).json({
            success:false,
            message:"Password not matched"
        }) 
     }
    }
      return res.status(200).json({
            success:true,
            message:"Password update done"
        })  
}


module.exports = { registrationController , loginController , verifyEmailController, forgotPasswordController, ResetPasswordController }



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWE5YjBlOTM2ODQ3N2RlMDIyZmNhOTEiLCJlbWFpbCI6ImZhcmhhMTY4bmFAZ21haWwuY29tIiwiaWF0IjoxNzg5NTc1ODk1LCJleHAiOjE3OTA0Mzk4OTV9.qsddD5E0dF5odKXa1t374tkBymmwBzBd5D1tjCn4jwM