import React, { useState } from 'react'
import {useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components'
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import {toast} from 'react-toastify'
function Registration() {
     const {register, error, setError, active, setActive} = useGlobalContext()
    const [inputState, setInputState] = useState({
        firstname: '',
        lastname: '',
        mobilenumber: '',
       email: '',
        password: '',
    })

    const { firstname, lastname, mobilenumber, email, password } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit =async e => {
        e.preventDefault()
       const bool =   validate(inputState)
         var response;
      if(bool == true)
      {
      response = await register(inputState)
      toast.success ('User registered succcessfully.')
      setActive(6)
      }
       console.log(response)
        setInputState({
            firstname: '',
            lastname: '',
            mobilenumber: '',
            email: '',
            password: ''
        })
    }

    const validate = (data) => {
        if(!data.firstname || !data.lastname || !data.mobilenumber || !data.email || !data.password)
        {
            setError("Please fill out all fields.")
            return false; 
        }
        if(data.firstname.length <2 || data.firstname.length>10){
            setError("First name should contain more than 2 and less than 10 letters.")
            return false;
        }
        if(data.lastname.length <2 || data.lastname.length>10){
            setError("Last name should contain more than 2 and less than 10 letters.")
            return false;
        }
        if(!/\S+@\S+\.\S+/.test(data.email)){
            setError("Invalid email address.")
            return false;
        }
        if(data.password.length <5)
        {
            setError("Password must be 5 characters long.")
            return false;
        }
        if(!/\d/.test(data.password))
        {
            setError("Password must contain atleast one number.")
            return false;
        }
        return true;
    }
    return (
        <FormStyled onSubmit={handleSubmit}>
            <h1>Registration</h1>
        {error && <p className='error'>{error}</p>}
        <div className="input-control">
            <input 
                type="text" 
                value={firstname}
                name={'firstname'} 
                placeholder="FirstName"
                onChange={handleInput('firstname')}
            />
        </div>
        <div className="input-control">
            <input value={lastname}  
                type="text" 
                name={'lastname'} 
                placeholder={'Last Name'}
                onChange={handleInput('lastname')} 
            />
        </div>
        <div className="input-control">
            <input value={mobilenumber}  
                type="number" 
                name={'mobilenumber'} 
                placeholder={'MobileNumber'}
                onChange={handleInput('mobilenumber')} 
            />
        </div>
        <div className="input-control">
            <input value={email}  
                type="email" 
                name={'email'} 
                placeholder={'Email'}
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
                    name={'Register'}
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
    text-align:center;
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

export default Registration