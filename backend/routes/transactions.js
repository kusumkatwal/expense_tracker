const { addExpense, getExpense, deleteExpense, getExpensesByMonth } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, getIncomeByMonth } = require('../controllers/income');
const predict = require('../controllers/algorithm')
// const monthlyRecordData = require('../controllers/monthlyrecord')
const {register, login, getLoggedInUser} = require('../controllers/auth')
const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/get-monthly-income', getIncomeByMonth )
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .get('/get-monthly-expense', getExpensesByMonth)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/register', register)
    .post('/login', login)
    .get('/me',getLoggedInUser)
    .post('/predict', predict)
    

module.exports = router