const { addExpense, getExpense, deleteExpense, getExpensesByMonth, getMonthlyExpenseByCategory, getCategoryExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, getIncomeByMonth, getMonthlyIncomeByCategory, getIncomeByCategory } = require('../controllers/income');
const predict = require('../controllers/algorithm')
// const monthlyRecordData = require('../controllers/monthlyrecord')
const {register, login, getLoggedInUser} = require('../controllers/auth')
const router = require('express').Router();
const authCheck = require('../middleware/auth.middleware')

router.post('/add-income',authCheck, addIncome)
    .get('/get-incomes',authCheck, getIncomes)
    .get('/get-monthly-income',authCheck, getIncomeByMonth )
    .delete('/delete-income/:id',authCheck, deleteIncome)
    .post('/add-expense', authCheck,addExpense)
    .get('/get-expenses',authCheck, getExpense)
    .get('/get-monthly-expense',authCheck, getExpensesByMonth)
    .delete('/delete-expense/:id',authCheck, deleteExpense)
    .post('/register', register)
    .post('/login', login)
    .get('/me',authCheck,getLoggedInUser)
    .post('/predict', authCheck,predict)
    .get('/getincomebycategory',authCheck, getMonthlyIncomeByCategory )
    .get('/getexpensebycategory', authCheck, getMonthlyExpenseByCategory)
    .get('/get-category-income', authCheck, getIncomeByCategory)
    .get('/get-category-expense', authCheck, getCategoryExpense)
    

module.exports = router