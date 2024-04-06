import image from '../../assests/img.png'
import { useState, useEffect } from 'react';
import './header.css'
const Header = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => clearInterval(interval);
    }, [])

    const options = {
        year: 'numeric',
        month: 'short', // Options: "numeric", "2-digit", "long", "short", "narrow"
        day: '2-digit', // Options: "numeric", "2-digit"
    };
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <img src={image} alt='logo' />
                </div>

                <div className="header-mid">
                    <p><i class="fi fi-sr-calendar"></i></p>
                    <p className='date'>{date.toLocaleDateString('en-US', options)}</p>
                </div>

                <div className='header-right'>
                   <p>
                   <i
                        class=
                        "fi fi-sr-envelope-dot"
                    ></i>
                   </p>
                    <p>
                    <i
                        class=
                        "fi fi-sr-bell"
                    ></i>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Header;