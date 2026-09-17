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

module.exports = {allusersControler}



