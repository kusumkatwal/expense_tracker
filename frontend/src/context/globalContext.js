import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:3006/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [jwt, setJwt] = useState(null)
    const [monthlyincome, setMonthlyincome] = useState([])
    const [monthlyexpense, setMonthlyexpense] = useState([])
    const [predictedValue, setPredictedValue] = useState()

    //calculate incomes
    const register = async (userDetails) => {
        const response = await axios.post(`${BASE_URL}register`, userDetails)
        return(response.data)
        // setError(response.data.message)
        //  .catch((err) => {
        //     setError(err.response.data.message)
        // })
      
    }

    const login = async (login_data) => {
        const response = await axios.post(`${BASE_URL}login`, login_data)
        
        .catch((err) => {
            setError(err.response.data.message)
        })
    }

    const monthlyIncome = async () => {
        const response = await axios.get(`${BASE_URL}get-monthly-income`)
        console.log(response.data)
        setMonthlyincome(response.data)
        
    }

    const monthlyExpense = async () => {
        const response = await axios.get(`${BASE_URL}get-monthly-expense`)
        setMonthlyexpense(response.data)
       
    }

    const getloggedInUser = async() => {
        const response = await axios.get(`${BASE_URL}me`)
        .catch((err) => {
            setError(err.response.data.message)
        })
    }
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const predict = async(test) => {
        const response = await axios.post(`${BASE_URL}predict`, test)
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
            monthlyIncome,monthlyexpense,monthlyincome,
            predictedValue
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}