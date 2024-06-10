const userService = require('../services/userService');
exports.register = async(req,res)=>{
    try{
        const {user,token} = await userService.register(req.body);
        return res.status(200).json({
            error:false,
            message:'Registred with success',
            user,token
        });
    }catch(error){
        return res.status(400).json({
            error:true,
            message:error.message
        });
    };
};
exports.login = async(req,res)=>{
     try{
        const {user,token} = await userService.login(req.body);
        return res.status(200).json({
            error:false,
            message:'Logged with success',
            user,token
        });
    }catch(error){
        return res.status(400).json({
            error:true,
            message:error.message
        });
    };
};