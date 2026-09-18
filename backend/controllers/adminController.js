const AllUser = require('../models/userSchema')

let allusersControler  =async (req,res)=>{
    let users = await AllUser.find({}).select('-password')
    res.status(200).json({
        success:true,
        message:`${users.length} users  found`,
        data:users
    })
    console.log("hello")
}

let singleUser = async (req,res)=>{
    let {id} = req.params

    let data = await AllUser.findById({_id:id}).select('-password')
    res.status(200).json({
        success:true,
        message:'User info found',
        data:data
    })
 }
let activeUser = async(req,res)=>{

    let data  = await AllUser.find({status:'active'})
       res.status(200).json({
        success:true,
        message:'Active user info found',
        data:data
    })
 }
let deactiveUser = async(req,res)=>{

    let data  = await AllUser.find({status:'deactive'})
       res.status(200).json({
        success:true,
        message:'Deactive user found',
        data:data
    })
 }

let updateUser = async(req,res)=>{
    let {id} = req.params

     await AllUser.findByIdAndUpdate({_id:id},req.body,{new:true})
       res.status(200).json({
        success:true,
        message:'User Updated',
    })
 }


module.exports = {allusersControler,singleUser,activeUser,deactiveUser,updateUser}



