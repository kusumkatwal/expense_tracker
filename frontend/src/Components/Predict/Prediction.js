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
const {test} = inputState;
    const handleInput =name => e => {
      setInputState({...inputState, [name]:e.target.value}) 
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
                    <div className="income-past">
                        <h2>
                            Total Incomes In Past Months
                        </h2>
                        <div className="content" >
                            {
                                monthlyincome.map((income) => {
                                    const { _id, totalAmount } = income;
                                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                                    const monthName = monthNames[_id.month - 1];
                                    return (
                                        <div className="inner-content" key={`${_id.month}-${_id.year}`}>
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
                        <div className="content" >
                            {
                                monthlyexpense.map((expense) => {
                                    const { _id, totalAmount } = expense;
                                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                                    const monthName = monthNames[_id.month - 1];
                                    return (
                                        <div className="inner-content" key={`${_id.month}-${_id.year}`}>
                                            <h5>{`${monthName},${_id.year}`}</h5>
                                            <p>Rs {totalAmount}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="predict">
                        <h2>
                            Make Prediction
                        </h2>
                        <div className="form">
                           <form onSubmit={handleSubmit}>
                           <div className="input-control">
                                <input
                                    type="text"
                                    value={test}
                                    name={'test'}
                                    placeholder={'Enter your salary'}
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
                          <div><p>Your expected expense for next month is {parseInt(predictedValue)}</p></div>
                           </form>
                           
                        </div>
                    </div>
                </div>
            </PredictionStyle>
        </>
    );
}
const PredictionStyle = styled.div`
.income-past, .expense, .balance{
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    p{
        font-size: 3.5rem;
        font-weight: 700;
    }
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }
}
`
export default Prediction;