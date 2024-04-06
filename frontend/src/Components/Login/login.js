import {useGlobalContext} from "../../context/globalContext";
import React, { useState } from 'react'
import styled from 'styled-components'
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Login() {

    const {login, error, setError, setJwt, jwt} = useGlobalContext()
    const [inputState, setInputState] = useState({
        email: '',
        password: '',
    })

    const { email, password } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
       const response =login(inputState)
       console.log(response)
    //    const token = response.promiseResult.token;
       if(response) 
       {
        setJwt(response.token)
       }

        setInputState({
            email: '',
            password: ''
        })
    }
    return (
        <FormStyled onSubmit={handleSubmit}>
            <h1>Login</h1>
        {error && <p className='error'>{error}</p>}
        <div className="input-control">
            <input 
                type="email" 
                value={email}
                name={'email'} 
                placeholder="Email"
                onChange={handleInput('email')}
            />
        </div>
        <div className="input-control">
            <input value={password}  
                type="password" 
                name={'password'} 
                placeholder={'Password'}
                onChange={handleInput('password')} 
            />
        </div>
           
        <div className="submit-btn">
                <Button 
                    name={'Login'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}
const FormStyled = styled.form`
h1{
    text-align : center;
}
padding:10px 500px;
margin:auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            margin:auto;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export default Login
