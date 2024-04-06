// Notification.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import NotificationCard from '../common/Notification';

const Notification = () => {
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    const handleCreateNew = () => {
        navigate('/Form'); 
    };

    return (
        <>
            <div className="notification">
                <div className="notification-top">
                    <div className="add-new-safe" onClick={handleCreateNew}>
                        <p className="icon">
                            <i className="fi fi-sr-add"></i>
                        </p>
                        <p className="text">Create new</p>
                    </div>
                </div>
                <div className="notification-main">
                    <div className="notification-title">
                        <p><i className="fi fi-rs-bell"></i></p>
                        <p>Notification panel</p>
                    </div>
                    <div className="notification-card">
                        <NotificationCard />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notification;
