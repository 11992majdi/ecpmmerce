
const mongoose = require('mongoose')
const {Schema}=mongoose
const productSchema = new Schema({
   
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    images:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model("Products", productSchema)