const Users = require("../models/userModels")
const bcrypt=require("bcrypt")
const  jwt=require("jsonwebtoken")
const product = require("../models/productModel")


 //register

 exports.register=async(req,res)=>{
     try {
        const {name, email, password} = req.body;
        const user = await Users.findOne({email});
         if(user){
         return res.status(400).send({errors:[{msg:"email exist"}]});
         }
         // Password Encryption
         const saltRounds=10;
         const passwordHash = await bcrypt.hash(password,saltRounds )
         const newuser=new Users({...req.body})
         //bcrypt
        newuser.password = passwordHash
         //json web token
         const token=jwt.sign({id:newuser._id},process.env.SECRET_KEY,{expiresIn:"3h"})
         await newuser.save()
         res.status(200).send({msg:"welcome",user:newuser,token})
     } catch (error) {
         res.status(400).send({msg:"failed",error})
     }
 }
 exports.login=async(req,res)=>{
    try {
       const {email, password} = req.body;
       const user = await Users.findOne({email});
        if(!user){
        return res.status(400).send({errors:[{msg:"bad credantial"}]});
        }
        //chek password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({msg: "Incorrect password."})
        }
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"3h"})

        res.status(200).send({msg:"welcome back",user:user,token})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}

//get all products
exports.getProduct=async(req,res)=>{
    try {
        const productListe=await product.find()
        res.status(200).send({msg:"all product",productListe})
        
    } catch (error) {
        res.status(400).send({msg:"failed ",error})
    }
}
//get one product
exports.getOneProduct=async(req,res)=>{
    try {
        const {_id}=req.params;
        let getProduct=await product.findOne({_id})
        res.status(200).send({masg:"this is product",getProduct})
    } catch (error) {
        res.status(400).send({msg:"failed",error})
    }
}
exports.addCart= async (req, res) =>{
    try {
        let prod = await product.findOne(req.prod)
       res.send({msg: "Added to cart",prod})
    } catch (err) {
        res.status(400).send({msg:"failed",error})
        
    }
}