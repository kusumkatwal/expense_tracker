const IncomeSchema= require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    console.log("I am on income");
    const {title, amount, category, description, date}  = req.body

    const income = IncomeSchema({
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
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getIncomeByMonth = async (req, res) => {
    console.log('I m on month')
    const { year, month } = req.params;
  
    try {
        const date = new Date(year, month - 1); // Month is zero-based index, so subtract 1

        // Format the date string in ISO 8601 format
        const isoDateString = date.toISOString();
    
        // Extract the date part from the ISO 8601 string (yyyy-mm-dd)
        const datePart = isoDateString.substr(0, 10);
        const dateTimeString = datePart + 'T18:15:00.000+00:00';
        const incomeRecords = await Income.find({
            date:{dateTimeString }
        });
       

        res.json(incomeRecords); 
        // Construct the desired date-time format
       
       
    } catch (error) {
      console.error('Error retrieving income records:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}