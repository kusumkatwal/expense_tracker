const IncomeSchema = require("../models/IncomeModel");
const querySvc = require("../service/query.service");


exports.addIncome = async (req, res) => {
    console.log("I am on income");
    const { title, amount, category, description, date } = req.body
    

    const income = IncomeSchema({
        userId: req.authUser._id,
        title,
        amount,
        category,
        description,
        date
    })
    console.log(income)

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await income.save()
        res.status(200).json({ message: 'Income Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({userId: req.authUser._id}).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getIncomeByMonth = async (req, res) => {
    try {
        const id = req.authUser._id;
        let response = await querySvc.getMonthlyIncome(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error retrieving income records:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getIncomeByCategory = async (req,res) => {
    try{
        const id = req.authUser._id;
        let response = await querySvc.getCategoryIncome(id);
        res.status(200).json(response);
    }catch(error) {
        console.error('Error retrieving records: ', error);
        res.status(500).json({message : 'Internal Server Error' });
    }
}

exports.getMonthlyIncomeByCategory = async (req, res) => {
    try{
        const id = req.authUser._id;
        let response = await querySvc.getMonthlyIncomeByCategory(id);
        res.status(200).json(response);
    }catch(error) {
        console.error('Error retrieving income records: ', error)
        res.status(500).json({ message : "Internal Server Error"})
    }
}


exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}

