const ExpenseSchema = require('../models/ExpenseModel')
const IncomeSchema = require('../models/IncomeModel')
class QueryService
{
     getMonthlyExpenses = async() => {
       const response = await ExpenseSchema.aggregate([
            {
                $group: {
                    _id: {month:{ $month: '$date' },year: { $year: '$date' }}, // Group by month
                    totalAmount: { $sum: '$amount' } // Calculate total amount for each month
                }
            },
            {
                $sort: { '_id': 1 } // Sort by month (optional)
            }
        ]).exec()

        return response
    }

    getMonthlyIncome = async() => {
        const response =  await IncomeSchema.aggregate([
            {
                $group: {
                    _id: {month:{ $month: '$date' },year: { $year: '$date' }}, // Group by month
                    totalAmount: { $sum: '$amount' } // Calculate total amount for each month
                }
            },
            {
                $sort: { '_id': 1 } // Sort by month (optional)
            }
        ]).exec()

        return response;
    }
}

var querySvc = new QueryService()
module.exports  = querySvc