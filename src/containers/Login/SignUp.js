import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../../config/localstorage-helper';
import "./_login.scss"
import Toast from '../Items/Toast';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Items/Header';
import { loginUser } from '../../services/auth-services';

const SignUp = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signin_error, setSignInError] = useState(true)
    const [text, setToastText] = useState("")
    const [display, setDisplay] = useState(false)

    const checkSignupValue = async (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && password.length > 3)
            setSignInError(false)
        else
            setSignInError(true)
    }

    const login = async () => {
        const data = { email, password }
        const response = await loginUser(data)
        console.log('response -- ', response)
        setDisplay(true)
        if (response.status === true) {
            setTimeout(() => {
                setDisplay(false)
                navigate('/dashboard')
            }, 2000);
            setToastText("Logged In")
            setLocalStorage("token", response.data.token)
            setLocalStorage("refreshToken", response.data.refresh_token)
            setLocalStorage("name", response.data.name)
        }
        else {
            console.log('error --', response)
            setToastText(response.data.data)
            setTimeout(() => {
                setDisplay(false)
            }, 4000);
        }

    }

    return (
        <React.Fragment>
            <Header dashboard={false} />
            <div className="login-container container">
                <Toast text={text} display={display} />
                <div className='login-container-bgm'></div>
                <div className='login-form-container'>
                    {/* <p className='start-text'>Start for free</p> */}
                    <p className='create-account-text'>Enter your details<span className='dot-text'>.</span></p>
                    <p className='member-text'>Not a member?<Link to={'/'}> <span className='login-text'>Sign Up</span> </Link></p>
                    <div className='form-box'>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {/* <TextField id="outlined-basic" label="Full Name" variant="outlined" inputProps={{
                                autoComplete: 'none',
                            }} /> */}
                            <TextField id="outlined-basic" label="Email Address" variant="outlined" inputProps={{
                                autoComplete: 'none'
                            }} onChange={(e) => { setEmail(e.target.value); checkSignupValue(e.target.value) }} />
                            <TextField id="outlined-password-input" autoComplete="current-password" inputProps={{
                                autoComplete: 'none',
                            }}
                                label="Password"
                                type="password" onChange={(e) => setPassword(e.target.value)} />

                        </Box>

                        <Button variant="contained" disabled={signin_error} className='signup-btn' onClick={() => login()}>Login</Button>
                    </div>
                </div>
                <div className='login-right-container'>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignUp;
