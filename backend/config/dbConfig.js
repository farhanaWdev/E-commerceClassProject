const mongoose = require('mongoose')

 function dbConfig(){
   return mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("database connected")
     }).catch((err)=>{
       console.log("Database connection Error: ", err)
})
}
module.exports = dbConfig