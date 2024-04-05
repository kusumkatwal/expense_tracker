const Income = require('../models/IncomeModel'); // Import the Income model
const Expense = require('../models/ExpenseModel'); // Import the Expense model
const MonthlyRecord = require('../models/MonthlyModel'); // Import the MonthlyRecord model

// Function to calculate total income for a specific month
const calculateTotalIncome = async (month, year) => {
  try {
    const incomes = await Income.find({
      date: {
        $gte: new Date(year, month - 1, 1), // Start of the month
        $lt: new Date(year, month, 1) // Start of the next month
      }
    });
    let totalIncome = 0;
    for (const income of incomes) {
      totalIncome += income.amount;
    }
    return totalIncome;
  } catch (error) {
    console.error('Error calculating total income:', error);
    throw error;
  }
};

// Function to calculate total expense for a specific month
const calculateTotalExpense = async (month, year) => {
  try {
    const expenses = await Expense.find({
      date: {
        $gte: new Date(year, month - 1, 1), // Start of the month
        $lt: new Date(year, month, 1) // Start of the next month
      }
    });
    let totalExpense = 0;
    for (const expense of expenses) {
      totalExpense += expense.amount;
    }
    return totalExpense;
  } catch (error) {
    console.error('Error calculating total expense:', error);
    throw error;
  }
};

// Function to store summary data into MonthlyRecord database
const storeMonthlySummary = async (month, year) => {
  try {
    // Calculate total income and total expense
    const totalIncome = await calculateTotalIncome(month, year);
    const totalExpense = await calculateTotalExpense(month, year);

    // Create or update monthly record in MonthlyRecord database
    const monthlyRecordData = {
      month,
      year,
      totalIncome,
      totalExpense
    };

    // Upsert (update or insert) the monthly record
    const filter = { month, year };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const updatedRecord = await MonthlyRecord.findOneAndUpdate(filter, monthlyRecordData, options);

    console.log('Monthly summary stored:', updatedRecord);
    // return updatedRecord;
    res.status(200).json({message: 'Income Added'})
  } catch (error) {
    console.error('Error storing monthly summary:', error);
    res.status(500).json({message: 'Server Error'})
    throw error;
  }
};
export default storeMonthlySummary;