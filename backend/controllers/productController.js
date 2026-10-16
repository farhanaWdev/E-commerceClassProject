const Product = require('../models/productSchema')

let createProductController = async (req, res) => {
    try {
        let { title, description, shortDescription, price, discountPrice, category, subCategory } = req.body

        if (!title || !description || !shortDescription  || !price || !discountPrice || !category || !subCategory) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        let slug = title.toLowerCase().split(" ").join("-")

        let existingSlug = await Product.findOne({slug:slug})

        if (existingSlug) {
            return res.status(400).json({
                success: false,
                message: "slug already exists"
            })
        }

        let sku = `newtEco-${Date.now()}`

        let existingSku = await Product.findOne({sku})

        if (existingSku) {
            return res.status(400).json({
                success: false,
                message: "Sku already exists"
            })
        } 

        let product = new Product({
            title,
            description,
            shortDescription,
            price,
            discountPrice,
            category,
            subCategory,
            slug,  
            sku
        })

        await product.save() 

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


let getAllProduct = async (req,res) =>{

    let product = await Product.find({}).populate(['category','Subcategory','owner'])

      res.status(200).json({
        success: true,
        message: "All products",
        product: product
    })
    
}

module.exports = { createProductController ,getAllProduct }