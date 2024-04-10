const querySvc = require('../service/query.service')
const algo = require('../algorithm/linear_regression')


const predict = async(req,res) => {
    try{
        const payload = req.body
        const incomes = await querySvc.getMonthlyIncome();
        const expenses = await querySvc.getMonthlyExpenses();
        const response = await algo.make_prediction(incomes, expenses,payload.test);
        console.log(response)
        res.json(response)
    }catch(exception)
    {
        console.log(exception)
        res.json({code:500, message: "Server Error"})
    }
}
module.exports = predict
