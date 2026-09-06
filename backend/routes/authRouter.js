const express = require('express');
const _ = express.Router();

_.post('/registration',(req,res)=>{
    const{Fullname ,email,password ,confirmPassword,terms}=req.body

        if(!Fullname || !email || !password || !terms){
            return res.status(400).json({
              success:false,
              message:"Fill all the fields "
        })
    }

        if(password !== confirmPassword){
            return res.status(400).json({
              success:false,
              message:"Password mismatch "
        })
    }



})


module.exports = _