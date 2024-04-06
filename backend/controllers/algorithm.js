const algo = require('../algorithm/linear_regression')
const predict = async(req,res) => {
    try{
        const payload = req.body
        console.log(payload)
        const response = await algo.make_prediction(payload.test);
        console.log(response)
        res.json(response)
    }catch(exception)
    {
        console.log(exception)
        res.json({code:500, message: "Server Error"})
    }
}
module.exports = predict