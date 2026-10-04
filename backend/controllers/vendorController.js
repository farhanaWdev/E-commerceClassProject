const category = require("../models/categorySchema")
const Subcategory = require("../models/subCategorySchema")

let createCategory = async(req,res)=>{

    let{name,owner}=req.body

    let existingName = await category.findOne({name:name.toLowerCase()})

    if(existingName){
    return res.status(400).json({
            success:false,
            message:"Category already existis"
        }) 
    }

    let category =new category({
        name:name.toLowerCase()
    })
    category.save()
        return res.status(201).json({
            success:true,
            message:"Category created"
        }) 
}

let getAllCategory = async(req,res)=>{

    let category = await category.find({}).populate('owner')
      res.status(200).json({
        success:true,
        message:"All Category",
        data: category
    })
}

let createSubCategoryController = async(req,res)=>{
     let{name,parentCategory}=req.body

    let existingName = await Subcategory.findOne({name:name.toLowerCase()})

    if(existingName){
    return res.status(400).json({
            success:false,
            message:"Category already existis"
        }) 
    }

    let category =new Subcategory({
        name:name.toLowerCase(),
        parentCategory
    })
    .save()
        return res.status(201).json({
            success:true,
            message:"Category created"
        }) 
}

let getAllsubCategory = async(req,res)=>{

    let category = await Subcategory.find({}).populate("parentCategory")
      res.status(200).json({
        success:true,
        message:"All Category",
        data: category
    })
}

let getAllCategoryWisesubCategory = async(req,res)=>{
    let {id}=req.params
    let category = await Subcategory.find({parentCategory:id})
      res.status(200).json({
        success:true,
        message:"All Category",
        data: category
    })
}

let getAllCategoryOWNERWisesubCategory = async(req,res)=>{
    let {id}=req.params
    let data = await category.find({owner:id})
      res.status(200).json({
        success:true,
        message:"All Category",
        data: data
    })
}


module.exports = {createCategory,getAllCategory,createSubCategoryController,getAllsubCategory,getAllCategoryWisesubCategory,getAllCategoryOWNERWisesubCategory}



