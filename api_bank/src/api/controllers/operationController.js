const operationService = require('../services/operationService');
exports.transfer = async(req,res)=>{
    try {
        const transfer = await operationService.makeTransfer(req.body,req.userLogged);
        return res.status(200).json({
            error:false,
            message: 'Transaction made with success',
            transfer
        });
    } catch (error) {
        return res.status(400).json({
            error:true,
            message: error.message 
        });
    };
};