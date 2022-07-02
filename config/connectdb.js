const mongoose =require("mongoose")

const conectdb=async()=>{
try {
    await mongoose.connect(process.env.URI)
    console.log("database connected")
} catch (error) {
    console.log("failed to connect")
}}


module.exports=conectdb