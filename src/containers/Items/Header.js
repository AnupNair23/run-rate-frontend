import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getLocalStorageValue, removeStorage } from '../../config/localstorage-helper';

const Header = (props) => {

    const name = getLocalStorageValue("name")
    let navigate = useNavigate()
    const logout = async () => {
        removeStorage("token")
        removeStorage("refreshToken")
        removeStorage("name")
        navigate("/login")
    }
    return (
        <div className='header-container'>
            <p>Run Rate</p>
            {props.dashboard === true &&
                <div className='right-side-header'>
                    <p className='logout-option profile-option'>Hi {name.split(" ")[0]}</p>
                    <p className='logout-option' onClick={() => logout()}>Logout</p>
                </div>
            }
        </div>
    );
};

export default Header;
