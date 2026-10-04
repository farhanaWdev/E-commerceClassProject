const mongoose = require('mongoose')
const {Schema}= mongoose

const subcategorySchema = new Schema({

    name:{
        type:String,
        require:true,
        unique:true
    },

     status:{
        type:String,
        enum:['active','deactive','reject'],
        default:'deactive'
    },

    parentCategory:{
        type:Schema.Types.ObjectId,
        ref:'category'
    }
 
})

module.exports =mongoose.model('Subcategory', subcategorySchema)