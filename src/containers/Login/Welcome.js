import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setLocalStorage } from '../../config/localstorage-helper';
import "./_login.scss"
import Toast from '../Items/Toast';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Items/Header';
import { verifyUser } from '../../services/auth-services';

const Welcome = (props) => {
    const location = useLocation()
    console.log(props, location)
    if (location.pathname.includes("/confirm/")) {
        console.log('check - ', location.pathname.substring(9, location.pathname.length))
        verifyUser(location.pathname.substring(9, location.pathname.length));
    }

    return (
        <React.Fragment>
            <Header />
            <div className='welcome-container'>
                <p className='thanks-registering'>Hey thanks for registering! </p>
                <p className='login-text'><Link to={'/login'}>Login</Link> now to proceed to the app</p>
            </div>
        </React.Fragment>
    );
};

export default Welcome;
