const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome,getIncomeByMonth } = require('../controllers/income');
// const monthlyRecordData = require('../controllers/monthlyrecord')
const {register, login, getLoggedInUser} = require('../controllers/auth')
const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/get-monthly-income/:date', getIncomeByMonth )
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/register', register)
    .post('/login', login)
    .get('/me',getLoggedInUser)
    

module.exports = router