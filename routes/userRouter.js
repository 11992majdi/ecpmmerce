const express = require("express");
const { getOneProduct } = require("../controllers/adminCtrl");
const { register, login, getProduct, addCart } = require("../controllers/userCtrl");
const { auth } = require("../middleware/auth");
const { registerValidator, loginValidator, validation } = require("../middleware/validator");
const router = express.Router()

router.post('/register',registerValidator(),validation, register)
router.post('/login',loginValidator(),validation, login)
router.get("/current",auth,(req,res)=>{
    res.send(req.user)
})

router.post('/addCart',addCart)

router.get('/',getProduct)
router.get('/:_id',getOneProduct)


module.exports=router