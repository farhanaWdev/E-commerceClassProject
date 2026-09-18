// const category = require("../models/categorySchema")

// let userController  = ()=>{
//     console.log("hello")
// }

// let createCategory = async(req,res)=>{
//     let{name}=req.body
//     let existingName = await category.findOne({name:name.toLowerCase()})
//     if(existingName){
//     return res.status(400).json({
//             success:false,
//             message:"Category already existis"
//         }) 

//     }
//     let category =new category({
//         name:name.toLowerCase()
//     })
//     category.save()
//   return res.status(201).json({
//             success:true,
//             message:"Category created"
//         }) 
   

// }
// let getAllCategory = async(req,res)=>{
//     let category = await category.find({})

//     res.status(200).json({
//         success:true,
//         message:"All Category",
//         data: category
//     })}

// module.exports = {userController,createCategory,getAllCategory}



