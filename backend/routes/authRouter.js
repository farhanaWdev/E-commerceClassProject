const express = require('express');
const _ = express.Router();

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
_.post('/registration',(req,res)=>{
    const{Fullname ,email,password ,confirmPassword,terms}=req.body

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

    // ---sudu bad request ashtese ---gotta change this regex !!!!!!!


})


module.exports = _