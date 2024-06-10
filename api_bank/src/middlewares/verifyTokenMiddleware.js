const jwt = require('jsonwebtoken');
const config = require('../config/index')
exports.verifyToken = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({
            error:true,
            message:'empty header'
        });
    };
    const parts = authHeader.split(" ");
    if(parts.length !== 2){
        return res.status(400).json({
            error:true,
            message:'token invalid'
        });
    };
    const [schema,token] = parts;
    if(schema.indexOf('bearer') !== 0){
        return res.status(400).json({
            error:true,
            message:'type token invalid'
        });
    };
    return jwt.verify(token,config.secret, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "Token invalid or expired"
            });
        };
        req.userLogged = decoded;
        next();
    });
};