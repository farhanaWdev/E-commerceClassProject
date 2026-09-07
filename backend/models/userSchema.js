const mongoose = require('mongoose')
const {Schema}= mongoose

const userSchema = new Schema({
    Fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    terms:{
        type:Boolean,
        required:true
    }
})

module.exports =mongoose.model('AllUser', userSchema)