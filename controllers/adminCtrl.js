const bcrypt=require("bcrypt");
const  jwt=require("jsonwebtoken");
const Admin  = require("../models/adminModel");
const products = require("../models/productModel");
const Users =require ("../models/userModels");




exports.register=async(req,res)=>{
    try {
       const {name, email, password} = req.body;
       const admin = await Admin.findOne({email});
        if(admin){
        return res.status(400).send({errors:[{msg:"email exist"}]});
        }
        // Password Encryption
        const saltRounds=10;
        const passwordHash = await bcrypt.hash(password,saltRounds )
        const newadmin=new Admin({...req.body})
        //bcrypt
       newadmin.password = passwordHash
        //json web token
        const token=jwt.sign({id:newadmin._id},process.env.SECRET_KEY,{expiresIn:"3h"})
        await newadmin.save()
        res.status(200).send({msg:"welcome",admin:newadmin,token})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}


exports.login=async(req,res)=>{
    try {
       const {email, password} = req.body;
       const admin = await Admin.findOne({email});
        if(!admin){
        return res.status(400).send({errors:[{msg:"bad credantial"}]});
        }
        //chek password
        const isMatch = await bcrypt.compare(password, admin.password)
        if(!isMatch) {
            return res.status(400).json({msg: "Incorrect password."})
        }
        const token=jwt.sign({id:admin._id},process.env.SECRET_KEY,{expiresIn:"3h"})

        res.status(200).send({msg:"welcome back",admin:admin,token})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}
// add product 

  
exports.addproduct = async(req,res)=>{
   
try {
    const {title,price, description , category}=req.body
    let images=""
    if(req.file){
        images=req.file.filename
    }
    const newProduct = new products({title,price, description,images, category})
    await newProduct.save()
    res.status(200).send({msg:"product added",newProduct})
} catch (error) {
    res.status(400).send({msg:"failed",error})
}
}



//get all products
exports.getProduct=async(req,res)=>{
    try {
        const productListe=await products.find()
        res.status(200).send({msg:"all product",productListe})
        
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}

//get one product
exports.getOneProduct=async(req,res)=>{
    try {
        const {_id}=req.params;
        let getProduct=await products.findOne({_id})
        res.status(200).send({masg:"this is product",getProduct})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}
//update product
exports.updateProduct=async(req,res)=>{
    try{
     const {_id}=req.params
    const {title,price, description,category}=req.body
    let {images}=req.file.filename
    // let images=""
    // if(req.file){
    //     images=req.file.filename
    // }
    await products.updateOne({_id},{$set:{...req.body}},{$set:{...req.file.filename}})
    res.status(200).send({masg:"product update"})
    }catch(error){
    res.status(400).send({msg:"failed",error})
    }
}
//delete product
exports.deleteProduct=async(req,res)=>{
    try {
        let {_id}=req.params;
        await products.deleteOne({_id})
        res.status(200).send({msg:"product deleted"})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}
// get all users
exports.getUsers=async(req,res)=>{
    try {
        const userctList=await Users.find()
        res.status(200).send({msg:"all user",userctList})
        
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}
exports.getOneUser= async(req,res)=>{
    try {
        const {_id}=req.params;
        let userToGet=await Contact.findOne({_id})
        res.status(200).send({masg:"get user",userToGet})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}
exports.deleteUser=async(req,res)=>{
    try {
        let {_id}=req.params;
        await Users.deleteOne({_id})
        res.status(200).send({msg:"user deleted"})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}