const mongoose=require("mongoose")
const {Schema}=mongoose
const adminSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    },
})

module.exports=Admin=mongoose.model("admin",adminSchema)