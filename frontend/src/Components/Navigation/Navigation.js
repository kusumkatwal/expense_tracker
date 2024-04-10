// import React, { useState } from 'react'
import styled from 'styled-components'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext'
import {toast} from 'react-toastify'

function Navigation({active, setActive}) {
    const {jwt, setJwt} = useGlobalContext();
    function signOut ()
    {
        toast.success("You are logged out.")
        setJwt('')
        
    }
    
    
    return (
        <NavStyled>
            <div className="user-con">
                            
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >

                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav" >
                <li onClick={signOut}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    
    width: 100%;
    height: 100px;
    background: white;
    border-radius:20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  gap: 2rem;
    .user-con{
        padding:50px 20px;
        height:70px;
        width:30px;
        display: flex;
        align-items: center;
        gap: 2rem;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items, .bottom-nav{
     
        flex:1;
        display: flex;
        flex-direction: row;
        li{
          padding:30px 120px;
            display: grid;
            grid-template-columns: 40px auto;
            justify-content: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        
    }
`;

export default Navigation