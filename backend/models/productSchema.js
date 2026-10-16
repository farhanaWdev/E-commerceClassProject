const mongoose = require('mongoose')
const {Schema}= mongoose

const productSchema = new Schema({

    title :{
        type :String,
        required :true,
        unique :true
    },
    description :{
        type :String
    },
    shortDescription :{
        type :String
    },
    sku :{
        type :String,
        required :true,
        unique :true
    },
    slug :{
        type :String,
        required :true,
        unique :true
    },
    price :{
        type :Number,
        required :true,
    },
    images :[{

        url :{
                type :String
            },
        isMain :{
                type :Boolean,
                default :false 
            }
     }],
    discountPrice :{
        type :Number,
    },
    stock :{
        type :Number,
    },
    status :{
        type :String,
        enum : ['approved' ,'rejected' ,'pending'],
        default :'pending'
    },
    category :{
        type :Schema.Types.ObjectId,
        ref :"category"
    },
    subCategory :{
        type :Schema.Types.ObjectId,
        ref :"Subcategory"
    },
    owner :{
        type :Schema.Types.ObjectId,
        ref :"AllUser"
    }},




    { timestamps: true


 
 
})

module.exports =mongoose.model('Product', productSchema)