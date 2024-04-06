import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import styled from 'styled-components'
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Prediction() {

    const { monthlyincome, monthlyexpense, monthlyIncome, monthlyExpense, predict, predictedValue } = useGlobalContext();
    const [inputState, setInputState] = useState({
        test: ''
    })
    const [show, setShow] = useState(false)
    useEffect(() => {
        monthlyIncome()
        monthlyExpense()
    }, [])
    const { test } = inputState;
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
    }

    const handleSubmit = e => {

        e.preventDefault()
        console.log(test)
        predict(inputState)
        setInputState({
            test: ''
        })
        setShow(true)
    }
    return (
        <>
            <PredictionStyle>

                <div className="past-summarization">
                    <h1 >Monthly Records</h1>
                    <div className="row">
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
                                                <h5>{`${monthName},${_id.year}`}</h5>
                                                <p>Rs {totalAmount}</p>
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
                                                <h5>{`${monthName},${_id.year}`}</h5>
                                                <p>Rs {totalAmount}</p>
                                            </div>
                                        );
                                    })
                                }
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
                                    <div className="display">{show && <p className="text">Your expected expense for next month is Rs{parseInt(predictedValue)}.</p>}
                                    </div>
                        </div>
                       

                    </div>
                </div>
            
        </PredictionStyle >
        </>
    );
}
const PredictionStyle = styled.div`
.past-summarization {
    margin:150px 50px;
    width:100%
    background: #FCF6F9;
    display:flex;
    flex-direction : column;  
}
h1{
    text-align: center;
}
.row{
    display:grid;
    grid-template-columns:1fr 1fr;
    justify-content: space-around;
}
.income-past{
    margin:20px;
}
.expense-past {
    margin:20px;

}
.content-class{

}
.inner {
    display: flex;
    flex-direction:row;
    gap:1rem;
    padding:20px;
    background-color : #ECF0F7;
    margin:10px;
    justify-content:space-around;
}
.predict {
    gap:1rem;
}
h2{
    text-align : center;
}
.row{
    display: grid;
    grid-template-columns: 1fr 1fr;

}
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
    .text {
        margin: 40px;
        padding-top : 50px;
        margin:auto;
        color : var(--primary-color)
        
    }

}
`
export default Prediction;