const mongoose = require('mongoose');


const MonthlyRecordSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    incomes: [incomeSchema], // Array of income entries for the month
    expenses: [expenseSchema] // Array of expense entries for the month
,
}, {timestamps: true})

module.exports = mongoose.model('MonthlyRecord', MonthlyRecordSchema)