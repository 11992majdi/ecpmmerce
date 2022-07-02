const express = require("express");
const multer =require("multer")
const path = require('path')
const
    { login, register,
      addproduct, updateProduct,
      getProduct, getOneProduct, deleteProduct, getUsers, deleteUser, getOneUser,}
       = require("../controllers/adminCtrl");
const { authAdmin } = require("../middleware/authAdmin");
const { registerValidator, validation, loginValidator } = require("../middleware/validator");
const router = express.Router();


router.post('/register',registerValidator(),validation, register);
router.post('/login',loginValidator(),validation, login);
router.get("/current",authAdmin,(req,res)=>{
  res.send(req.admin)
});

const storage = multer.diskStorage({
    destination: "client/public/upload",
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }});

const upload = multer({
    storage: storage,
});
router.post('/add',upload.single("images"),addproduct);

router.get('/',getProduct);
router.get('/users',getUsers);
router.get('/:_id',getOneProduct);
router.get('/user/:_id',getOneUser);


router.put('/update/:_id',upload.single("images"),updateProduct);
router.delete('/delete/:_id',deleteProduct);
router.delete('/deleteUser/:_id',deleteUser);


module.exports=router