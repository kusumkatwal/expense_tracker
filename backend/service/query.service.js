const ExpenseSchema = require('../models/ExpenseModel')
const IncomeSchema = require('../models/IncomeModel')
class QueryService {
    getMonthlyExpenses = async (id) => {
        const response = await ExpenseSchema.aggregate([
            {
                $match: { userId: id } // Filtering documents by userId
            },
            {
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]).exec()

        return response
    }

    getMonthlyIncome = async (id) => {
        const response = await IncomeSchema.aggregate([
            {
                $match: { userId: id }
            },
            {
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]).exec()

        return response;
    }

    getCategoryIncome = async (id) => {
        const response = await IncomeSchema.aggregate([
            { 
                $match: { userId: id }
            },
            {
                $group: {
                    _id: {
                        category : '$category'
                    },
                    totalAmount : {$sum : '$amount'}
                }
            }
        ]).exec()
        return response;
    }

    getCategoryExpense = async (id) => {
        const response = await ExpenseSchema.aggregate([
            { 
                $match: { userId: id }
            },
            {
                $group: {
                    _id: {
                        category : '$category'
                    },
                    totalAmount : {$sum : '$amount'}
                }
            }
        ]).exec()
        return response;
    }

    getMonthlyIncomeByCategory = async (id) => {
        const response = await IncomeSchema.aggregate([
            {
                $match: { userId: id }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' },
                        category: '$category'
                    },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]).exec()

        return response;
    }

    getMonthlyExpenseByCategory = async (id) => {
        const response = await ExpenseSchema.aggregate([
            {
                $match: { userId: id }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' },
                        category: '$category'
                    },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]).exec()

        return response;
    }
}

var querySvc = new QueryService()
module.exports = querySvc