import { useGlobalContext } from "../../context/globalContext";
import { useEffect, useState } from "react";
import img from '../../assests/pic.jpg';
import styled from 'styled-components';
import { cardItems } from "../../utils/cardItems";
import card1 from '../../../src/assests/card1.jpg'
import card2 from '../../../src/assests/card2.jpg'
import card3 from '../../../src/assests/card3.jpg'
import card5 from '../../../src/assests/card5.jpg'

function Homepage(){

    const {username} = useGlobalContext();
    console.log(username)
    return(
       <>
       <HomepageStyle>
    <div className="home-main">
        <div className='home-main-row'>
            <div className="main-left">
               <h1>Greetings!</h1>
               <p>What are we doing today?</p>
            </div>
            <div className="main-right">
                <img src={img} alt="image"/>
                
            </div>
        </div>

        <div className="home-second-row">
                <div className="card">
                    <img src={card1} alt="card1"/>
                    <p>Manage finances</p>
                </div>
                <div className="card">
                    <img src={card2} alt="card2"/>
                    <p>Record finances</p>
                </div>
                <div className="card">
                    <img src={card3} alt="card3"/>
                    <p>Monitor expenses</p>
                </div>
                <div className="card">
                    <img src={card5} alt="card5"/>
                    <p>Keep saving.</p>
                </div>
        </div>
    </div>
    </HomepageStyle>
       </>
    )
}
const HomepageStyle = styled.div`
.home-main{
    margin:20px;
    display:flex;
width:100%;
flex-direction: column;

}
.home-main-row{
    display: grid;
   grid-template-columns: 1fr 1fr;
   justify-content: center;
}
.main-left{
    margin: auto;
}
.home-second-row {
    display : grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap:10px;
    margin:20px;
}
.card{
    background-color: white;
    border-radius:10px;
    padding:20px;
    margin:auto;
    img{
        height: 150px;
        width: 150px;
    }
}


`

export default Homepage;