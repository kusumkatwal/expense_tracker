import {dashboard, expenses, transactions, trend} from '../utils/Icons'
import title from '../assests/title.png'

export const menuItems = [
    {
        id: 1,
        title: "Homepage",
        icon: dashboard,
        link: '/homepage'
    },
    {
        id: 2,
        title: "Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Registration",
        icon: trend,
        link: "/register",
    },{
        id: 6,
        title: "Login",
        icon: dashboard,
        link: "/login"
    }
]