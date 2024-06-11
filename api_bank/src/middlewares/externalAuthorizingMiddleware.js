const externalAuthorizingService = require('../api/services/externalAuthorizingService');
exports.authorization = async(req,res,next)=>{
    try {
        const response = await externalAuthorizingService.getAuthorization();
        if(response === true){
            next();
        }  
    } catch (error) {
        return res.status(400).json({
            error:true,
            message:error.message
        })
    }
}