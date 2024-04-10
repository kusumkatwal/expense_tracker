const ExpenseSchema = require("../models/ExpenseModel")
const querySvc = require("../service/query.service")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = ExpenseSchema({
        userId: req.authUser._id,
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find({userId: req.authUser._id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getExpensesByMonth = async (req, res) => {
    try {
        let id = req.authUser._id;
        let response = await querySvc.getMonthlyExpenses(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error retrieving income records:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCategoryExpense = async (req,res) => {
    try{
        let id = req.authUser._id;
        let response = await querySvc.getCategoryExpense(id);
        res.status(200).json(response);
    }catch(error) 
    {
        console.error('Error retrieving income records:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.getMonthlyExpenseByCategory = async (req, res) => {
    try{
        const id = req.authUser._id;
        let response = await querySvc.getMonthlyExpenseByCategory(id);
        res.status(200).json(response);
    }catch(error) {
        console.error('Error retrieving income records: ', error)
        res.status(500).json({ message : "Internal Server Error"})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}