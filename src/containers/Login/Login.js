import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./_login.scss"
import Toast from '../Items/Toast';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Items/Header';
import { registerUser } from '../../services/auth-services';

const Login = () => {

    let navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const [password_error, setPasswordError] = useState(true)
    const [email_error, setEmailError] = useState(true)
    const [text, setToastText] = useState("")
    const [display, setDisplay] = useState(false)

    const signUp = async () => {
        console.log(name, email, password, confirm_password)
        registerUser({ name, email, password })
        setDisplay(true)
        setToastText("Please check your email and verify your account to continue")
        setTimeout(() => {
            setDisplay(false)
            navigate('/login')
        }, 4000);
    }

    const checkPassword = async (value) => {
        if (password === value && password.length > 3)
            setPasswordError(false)
        else
            setPasswordError(true)
    }

    const checkEmailError = async (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            setEmailError(false)
        else
            setEmailError(true)
    }

    return (
        <React.Fragment>
            <Header dashboard={false} />
            <div className="login-container container">
                <Toast text={text} display={display} />
                <div className='login-container-bgm'></div>
                <div className='login-form-container'>
                    <p className='start-text'>Start for free</p>
                    <p className='create-account-text'>Create a new account<span className='dot-text'>.</span></p>
                    <p className='member-text'>Already a member? <Link to={'/login'}> <span className='login-text'>Log In</span> </Link></p>
                    <div className='form-box'>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" inputProps={{
                                autoComplete: 'none',
                            }} onChange={(e) => setName(e.target.value)} />

                            <TextField id="outlined-basic" label="Email" variant="outlined" error={email_error} helperText="Enter valid email" inputProps={{
                                autoComplete: 'none'
                            }} onChange={(e) => { setEmail(e.target.value); checkEmailError(e.target.value) }} />

                            <TextField id="outlined-password-input" autoComplete="current-password" error={password_error} inputProps={{
                                autoComplete: 'none',
                            }}
                                label="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)} />

                            <TextField id="outlined-password-input" autoComplete="current-password" error={password_error} helperText="Passwords don't match" inputProps={{
                                autoComplete: 'none',
                            }}
                                label="Confirm Password"
                                type="password"
                                onChange={(e) => { setConfirmPassword(e.target.value); checkPassword(e.target.value) }} />

                        </Box>
                        <Button variant="contained" disabled={password_error || email_error} className='signup-btn' onClick={() => signUp()}>Sign Up</Button>
                    </div>
                </div>
                <div className='login-right-container'>

                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
