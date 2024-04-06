import React from 'react';
import '../styles/homepage.css';
import image from '../../assests/pic.jpg'; 


const Dashboard = () => {
    return (
        <>
        <div className="dashboard-main-left">
            <div className="greeting">
                <h2>Hi, Greetings!</h2>
                <div className="greeting-content">
                    <p className="greeting-text">What are we doing today?</p>
                </div>
            </div>
            <div className="tasks">
                <div className="task">
                    <i className="fi fi-sr-caret-right" id='a'></i>
                    <p className='desc'>Manage wallets</p>
                </div>
                <div className="task">
                    <i className="fi fi-sr-caret-right" id='b'></i>
                    <p className='desc'>Manage wallets</p>
                </div>
                <div className="task">
                    <i className="fi fi-sr-caret-right" id='c'></i>
                    <p className='desc'>Manage wallets</p>
                </div>
                <div className="task">
                    <i className="fi fi-sr-caret-right" id='d'></i>
                    <p className='desc'>Manage wallets</p>
                </div>
            </div>
            <div className="dashboard-image-container">
                <img src={image} alt='wallet' className="dashboard-image" style={{ height: '200px' }} />
            </div>
        </div>

        <div className='dash_design'>
        <div className="dashboard-main-down1">

        <h2>Hi, Greetings!</h2>
        </div>

        <div className="dashboard-main-down2">
        <h2>Hi, Greetings!</h2>
        </div>

        <div className="dashboard-main-down3">
        <h2>Hi, Greetings!</h2>
        </div>

        <div className="dashboard-main-down4">
        <h2>Hi, Greetings!</h2>
        </div>
        </div>
        </>
    );
}

export default Dashboard;
