const jwt = require("jsonwebtoken");
const Users = require("../models/userModels");


exports.auth = async (req, res, next) =>{
    try {
        const token = req.header("Authorization");
        if(!token) {
             res.status(401).send({errors:[{msg: "Invalid Authentication"}]});
        }
       const decoded = jwt.verify(token, process.env.SECRET_KEY);
       const user = await Users.findOne({_id: decoded.id});
        if(!user){
            res.status(401).send({errors:[{msg: "Invalid Authentication"}]});

        }
        req.user=user;
        next();
    } catch (err) {
        res.status(400).send({errors:[{msg:"not aouthorized"}]});
    }
}

