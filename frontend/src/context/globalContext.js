import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:3006/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [jwt, setJwt] = useState(null)
    const [monthlyincome, setMonthlyincome] = useState([])
    const [monthlyexpense, setMonthlyexpense] = useState([])
    const [predictedValue, setPredictedValue] = useState()
    const [active, setActive] = useState(1)
    const [username, setUsername] = useState()
    const [categoryData, setCategoryData] = useState([])
    const [expenseData, setExpenseData] = useState([])
    const [category, setCategory] = useState([])

    //calculate incomes
    const register = async (userDetails) => {
        const response = await axios.post(`${BASE_URL}register`, userDetails)
        return (response.data)
        // setError(response.data.message)
        //  .catch((err) => {
        //     setError(err.response.data.message)
        // })

    }

    const login = async (login_data) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, login_data);
            console.log(response.data)
            setJwt(response.data.token)
            return response.data;
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    const monthlyIncome = async () => {
        const response = await axios.get(`${BASE_URL}get-monthly-income`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        console.log(response.data)
        setMonthlyincome(response.data)

    }

    const monthlyExpense = async () => {
        const response = await axios.get(`${BASE_URL}get-monthly-expense`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        setMonthlyexpense(response.data)

    }

    const monthlyIncomeCategory = async () => {
        const response = await axios.get(`${BASE_URL}getincomebycategory`, {
            headers : {
                'Authorization' : `Bearer ${jwt}`
            }
        })
        setCategoryData(response.data)
        return response.data
    }

    const monthlyExpenseCategory = async () => {
        const response = await axios.get(`${BASE_URL}getexpensebycategory`, {
            headers : {
                'Authorization' : `Bearer ${jwt}`
            }
        })
        setExpenseData(response.data)
        return response.data        
    }

    const categoryExpense = async() => {
        const response = await axios.get(`${BASE_URL}get-category-expense`, {
            headers : {
                'Authorization' : `Bearer ${jwt}`
            }
        })
        setCategory(response.data)
        return response.data
    }

    const getloggedInUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}me`,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
            setUsername(response.data)
            return response.data
        }
        catch (err) {
            setError(err.response.data.message)
        }
    }
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const predict = async (test) => {
        const response = await axios.post(`${BASE_URL}predict`, test, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        setPredictedValue(response.data)

        return response
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }




    return (
        <GlobalContext.Provider value={{
            register,
            login,
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            setJwt,
            jwt,
            predict,
            monthlyExpense,
            monthlyIncome, monthlyexpense, monthlyincome,
            predictedValue,
            active, setActive,
            getloggedInUser, username,
            categoryData, monthlyIncomeCategory,
            expenseData, monthlyExpenseCategory,
            categoryExpense, category
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}