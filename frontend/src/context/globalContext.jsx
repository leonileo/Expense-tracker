import { createContext, useContext, useState } from "react";
import axios from 'axios'

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://expense-tracker-8ihq.onrender.com/";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
// incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch(err => {
            setError(err.response.data.message)
        })
        getIncomes();
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data);
    }

    const deleteIncomes = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    }
// calculate incomes
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        })
        return totalIncome;
    }
    
// Expenses
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
        .catch(err => {
            setError(err.response.data.message)
        })
        getExpenses();
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data);
    }

    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    }
// calculate expenses
    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense += expense.amount;
        })
        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]

        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0,3)
    }

    const allTransactionHistory = () => {
        const allHistory = [...incomes, ...expenses]

        allHistory.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return allHistory;
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncomes,
            totalIncome,
            // expenses
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            allTransactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}