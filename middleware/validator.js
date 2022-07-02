const { check, validationResult } = require("express-validator")

exports.registerValidator=()=>[

     check("name","name is required").not().isEmpty(),
     check("email","email valid").isEmail(),
     check("password","password valid").isLength({min:8}),

];
  
exports.loginValidator=()=>[

     check("email","email valid").isEmail(),
     check("password","password valid").isLength({min:8}),

] ;

exports.validation=(req,res,next)=>{
    const error=validationResult(req)
    if(!error.isEmpty){
        return res.status(400).json({errors:error.array()})

    }
    next()
}