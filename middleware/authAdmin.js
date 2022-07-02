const jwt = require('jsonwebtoken');
const Admin =require("../models/adminModel");


exports.authAdmin = async (req, res, next) =>{
    try {
        const token = req.header("Authorization");
        if(!token) {
             res.status(401).send({errors:[{msg: "Invalid Authentication"}]});
        }
       const decoded = jwt.verify(token, process.env.SECRET_KEY);
       const admin = await Admin.findOne({_id: decoded.id});
        if(!admin){
            res.status(401).send({errors:[{msg: "Invalid Authentication"}]});
        }
        // if(admin.role === 0)
        //     return res.status(400).json({msg: "Admin resources access denied"})
             
        req.admin=admin;
        next();
    } catch (err) {
        res.status(400).send({errors:[{msg:"not aouthorized"}]});
    }
}

