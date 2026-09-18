const mongoose = require('mongoose')
const {Schema}= mongoose

const categorySchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
     status:{
        type:String,
        enum:['active','deactive','reject'],
        default:'deactive'
    }
 
})

module.exports =mongoose.model('category', categorySchema)