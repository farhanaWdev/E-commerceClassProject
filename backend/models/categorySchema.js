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
    },

    owner:{
        type:Schema.Types.ObjectId,
        ref:"AllUser"
    }
 
})

module.exports =mongoose.model('category', categorySchema)