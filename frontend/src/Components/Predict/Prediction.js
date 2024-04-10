import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import styled from 'styled-components'
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { InnerLayout } from "../../styles/Layouts";
// import IncomeCategory from "../Categories/IncomeCategory";

function Prediction() {

    const { monthlyincome, monthlyexpense, monthlyIncome, monthlyExpense, predict, predictedValue, categoryData, monthlyIncomeCategory, expenseData, monthlyExpenseCategory, categoryExpense, category } = useGlobalContext();
    const [inputState, setInputState] = useState({
        test: ''
    })
    const [show, setShow] = useState(false)
    // const [predictedCategory, setPredictedCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await monthlyIncome();
                await monthlyExpense();
                await monthlyIncomeCategory();
                await monthlyExpenseCategory();
                await categoryExpense();
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const { test } = inputState;
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
    }

    const handleSubmit = async e => {

        e.preventDefault()
        await predict(inputState)
        setInputState({
            test: ''
        })
        // const predicted_category = categoryDataMapped.map((item) => {

        //     return {
        //         predicted_category: item.category,
        //         predictedcategory_amount:item.percent,
        //     }
        // })
        // setPredictedCategory(predicted_category);
        setShow(true);
        // console.log(predictedCategory);

    }
    const expenses = monthlyexpense.map((item) => item.totalAmount)
    var totalExpense = 0;
    for (var i = 0; i < expenses.length; i++) {
        totalExpense += expenses[i]
    }
    const categoryDataMapped = category.map((categoryItem) => {
        const { _id: categoryID, totalAmount: categoryTotalAmount } = categoryItem;
        return {
            category: categoryID.category,
            amount: categoryTotalAmount,
            percent: (totalExpense !== 0 ? categoryTotalAmount / totalExpense * 100 : 0)
        };
    });
    return (
      
            <PredictionStyle>
                  <InnerLayout>
                <div className="past-summarization">
                    <h1 >Monthly Records</h1>
                    <div className="past-row">
                        <div className="income-past">
                            <h2>
                                Total Incomes In Past Months
                            </h2>
                            <div className="contentclass" >
                                {
                                    monthlyincome.map((income) => {
                                        const { _id, totalAmount } = income;
                                        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                                        const monthName = monthNames[_id.month - 1];
                                        return (
                                            <div className="inner" key={`${_id.month}-${_id.year}`}>
                                                <div className="inner-row">
                                                    <h3>{`${monthName},${_id.year}`}</h3>
                                                    <p>Rs {totalAmount}</p>
                                                </div>
                                                <div className="inner-column">
                                                    {
                                                        categoryData.map((categoryItem) => {
                                                            const { _id: categoryID, totalAmount: categoryTotalAmount } = categoryItem;

                                                            if (_id.month == categoryID.month) {
                                                                const percent = (categoryTotalAmount / totalAmount) * 100;
                                                                return (
                                                                    <div className="category" key={`${categoryID.category}`}>
                                                                        <h5>{`${categoryID.category}`}</h5>
                                                                        <p>Rs {categoryTotalAmount}</p>
                                                                        <p>{percent.toFixed(0)} %</p>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="expense-past">
                            <h2>
                                Total Expenses In Past Months
                            </h2>
                            <div className="contentclass" >
                                {
                                    monthlyexpense.map((expense) => {
                                        const { _id, totalAmount } = expense;
                                        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                                        const monthName = monthNames[_id.month - 1];
                                        return (
                                            <div className="inner" key={`${_id.month}-${_id.year}`}>
                                                <div className="inner-row">
                                                    <h3>{`${monthName},${_id.year}`}</h3>
                                                    <p>Rs {totalAmount}</p>
                                                </div>
                                                <div className="inner-column">
                                                    {
                                                        expenseData.map((categoryItem) => {
                                                            const { _id: categoryID, totalAmount: categoryTotalAmount } = categoryItem;

                                                            if (_id.month == categoryID.month) {
                                                                const percent = (categoryTotalAmount / totalAmount) * 100;
                                                                return (
                                                                    <div className="category" key={`${categoryID.category}`}>
                                                                        <h5>{`${categoryID.category}`}</h5>
                                                                        <p>Rs {categoryTotalAmount}</p>
                                                                        <p>{percent.toFixed(0)} %</p>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="predict">
                    <h2>
                        Make Prediction
                    </h2>
                    <div className="row">
                        <div className="form">
                            <form onSubmit={handleSubmit}>
                                <div className="input-control">
                                    <input
                                        type="text"
                                        value={test}
                                        name={'test'}
                                        placeholder={'Enter your expected salary:'}
                                        onChange={handleInput('test')}
                                    />
                                </div>
                                <div className="submit-btn">
                                    <Button onClick={handleSubmit}
                                        name={'Click'}
                                        icon={plus}
                                        bPad={'.8rem 1.6rem'}
                                        bRad={'30px'}
                                        bg={'var(--color-accent'}
                                        color={'#fff'}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="display">
                            {show &&
                                <div className="predict_output">
                                    <p>Your expected expense for next month is Rs{parseInt(predictedValue)}.</p>
                                    <div className="category_card">
                                        {
                                            categoryDataMapped.map((item, index) => {
                                                return (
                                                    <div className="card" key={`${categoryDataMapped}-${index}`}>
                                                        <h5>{`${item.category}`}</h5>
                                                        <p>{item.percent.toFixed(2)} %</p>
                                                        <p>Rs{parseInt((item.percent/100) * predictedValue)}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>}

                        </div>
                    </div>


                </div>
                </InnerLayout>
            </PredictionStyle >
        
    );
}
const PredictionStyle = styled.div`
.past-summarization {
    margin:150px 50px;
    width:100%
    background: #FCF6F9;
    display:flex;
    flex-direction : column;  
    h1{
        text-align: center;
    }
    .past-row{
        width:100%;
        display:grid;
        grid-template-columns: 1fr 1fr; !important
        place-items : center;
        .income-past , .expense-past {
            margin:20px;
            .content-class{
                width: 100%;
                }
                .inner {
                    display: flex;
                    flex-direction:column;   
                    background-color : #ECF0F7;  
                    .inner-row{
                        display: flex;
                        flex-direction:row;
                        justify-content:space-around;
                        margin:10px;
                        background-color:white;
                        color:#42AD00;
                        padding:20px;
                    }
                    .inner-column {
                        display: grid;
                        grid-template-columns : 1fr 1fr;
                        place-items: center;
                    }
                }       
        }
       
    }
}
.predict {
  

h2{
    text-align : center;
}
.row{
    display: grid;
    grid-template-columns: 1fr 1fr;
    .form{
        form{
            margin:80px 10px;
            gap:2rem;
        }  
        .input-control{
            margin:40px 20px;
        }
        input{
            width: 400px;
            font-family: inherit;
            font-size: inherit;
            outline: none;
            border: none;
            padding: .5rem 1rem;
            border-radius: 5px;
            border: 2px solid #1D2F43;
            background: transparent;
            resize: none;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            color: rgba(34, 34, 96, 0.9);
            &::placeholder{
                color: #1D2F43;
            }
        .submit-button{
            margin: auto;
        }
    }
}
.display{
    margin:20px;
    .predict_output{
        display: flex;
        flex-direction: column;
        .category_card{
            display: grid;
            grid-template-columns:1fr 1fr;
            .card{
             display:flex;
             flex-direction:column;
             background-color : white;
             border-radius: 50%;
             height: 120px;
             width:120px;
             margin:20px;
             justify-content:center;
             align-items:center;
             border: 2px solid red;
            }
        }
    }
    
    
}
}
`
export default Prediction;