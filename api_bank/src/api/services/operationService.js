const transactionModel = require('../models/transactionModel');
const userModel = require('../models/userModel');

exports.makeTransfer = async (transferData) => {
    if (!transferData) throw new Error('transfer invalid');
    const { value, payerId, payeeId } = transferData;
    if (!value) throw new Error('value invalid');
    if (value <0) throw new Error('value is negative');
    if (!payerId) throw new Error('payerId invalid');
    if (!payeeId) throw new Error('payeeId invalid');
    if(payeeId === payerId) throw new Error('It is not possible to transfer to yourself')
    const payer = await userModel.findOne({ where: { id: payerId } });
    const payee = await userModel.findOne({ where: { id: payeeId } });
    
    if (!payer) throw new Error('Payer not found');
    if (!payee) throw new Error('Payee not found');
    
    if (payer.type === 'MERCHANT') throw new Error('This user does not have permission to transfer');
    if (parseFloat(payer.balance) < parseFloat(value)) throw new Error('without balance');
    
    payer.balance = parseFloat(payer.balance) - parseFloat(value);
    payee.balance = parseFloat(payee.balance) + parseFloat(value);
    
    await payer.save();
    await payee.save();
    
    const transaction = await transactionModel.create({
        value: parseFloat(value),
        payerId: payer.id,
        payeeId: payee.id
    });

    if(!transaction) {
        payer.balance = parseFloat(payer.balance) + parseFloat(value);
        payee.balance = parseFloat(payee.balance) - parseFloat(value);
    
        await payer.save();
        await payee.save();
        throw Error('error when transferring')
    };
    return transaction;
};
