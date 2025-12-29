import React, { useContext, useState } from 'react';
import '../App.css';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../contexts/AuthCotext';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function Authentication() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const [error, seterror] = useState();

    const [message, setMessage] = useState();

    const [formstate, setformstate] = useState(0);

    const [open, setopen] = useState(false);
    const [severity, setSeverity] = useState("error");



    const handlesetname = (event) => {
        setname(event.target.value);
    }
    const handlesetusername = (event) => {
        setusername(event.target.value);
    }
    const handlesetpasword = (event) => {
        setpassword(event.target.value);
    }

    const passwordRegex = /^(?=(?:.*\d){3,})(?=.*[A-Z])(?=.*[@#$%^&*]).+$/;

    const { handleregister, handlelogin } = useContext(AuthContext);

    let hancleauth = async () => {
        // if (name.trim() === "") {
        //     setMessage("Name is required");
        //     setopen(true);
        //     return;
        // }

        // if (username.trim() === "") {
        //     setMessage("Username is required");
        //     setopen(true);
        //     return;
        // }

        // if (username.length < 3) {
        //     setMessage("Username must be at least 3 characters");
        //     setopen(true);
        //     return;
        // }

        // if (password.trim() === "") {
        //     setMessage("Password is required");
        //     setopen(true);
        //     return;
        // }

        // if (!passwordRegex.test(password)) {
        //     setMessage(
        //         "Password must contain 1 capital letter, 1 special character & 3 numbers"
        //     );
        //     setopen(true);
        //     return;
        // }

        // setMessage("Signup successful ✅");
        // setSeverity("success");
        // setopen(true);
        try {
            if (formstate === 0) {
                let result = await handlelogin(username, password);
                console.log(result);

            }
            if (formstate === 1) {
                if (name.trim() === "") {
                    setMessage("Name is required");
                    setopen(true);
                    return;
                }

                if (username.trim() === "") {
                    setMessage("Username is required");
                    setopen(true);
                    return;
                }

                if (username.length < 3) {
                    setMessage("Username must be at least 3 characters");
                    setopen(true);
                    return;
                }

                if (password.trim() === "") {
                    setMessage("Password is required");
                    setopen(true);
                    return;
                }

                if (!passwordRegex.test(password)) {
                    setMessage(
                        "Password must contain 1 capital letter, 1 special character & 3 numbers"
                    );
                    setopen(true);
                    return;
                }

                setMessage("Signup successful ✅");
                setSeverity("success");
                setopen(true);
                let result = await handleregister(name, username, password);
                console.log(result);
                setMessage(result);
                setopen(true);
                seterror("");
                setformstate(0);
                setpassword("");
            }
        } catch (err) {
            console.log(err);
            let message = (err.response.data.message);
            seterror(message);
        }
    }

    const handleClose = () => {
        setopen(false);
    };
    return (
        <div className='registrationcontainer'>
            <div className='signuform'>
            </div>
            <div className='signuformm'>
                {/* <div className='logotag'> */}
                {/* <img style={{ width: "10%" }} src='/sinuplogo.png' /> */}
                {/* <h1><span>Meet</span>Hub</h1> */}
                {/* </div> */}
                <div className='form' action="">
                    <div className='signin'>
                        <div className='lockicon'>
                            <LockIcon style={{ fontSize: "1.7rem", color: "white" }} />

                        </div>
                        <div style={{ gap: "10px" }} className='lockiconn'>
                            <Button variant={formstate === 0 ? "contained" : ""} onClick={() => setformstate(0)}>SIGN IN</Button>
                            <Button variant={formstate === 1 ? "contained" : ""} onClick={() => setformstate(1)}>SIGN UP</Button>

                        </div>
                    </div>
                    <div className='data'>
                        {formstate === 1 ?
                            <TextField
                                type='text' style={{ width: "90%" }}
                                id="outlined-basic"
                                label="Full Name"
                                variant="outlined"
                                color='primary'
                                name='name'
                                required
                                value={name}
                                onChange={handlesetname} /> : <></>

                        }
                        <TextField
                            type='text'
                            style={{ width: "90%" }}
                            id="outlined-basic"
                            label="Username"
                            name='username'
                            value={username}
                            variant="outlined"
                            color='primary'
                            required
                            onChange={handlesetusername} />

                        <TextField
                            type='password'
                            style={{ width: "90%" }}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            value={password}
                            name='password'
                            color='primary'
                            required
                            onChange={handlesetpasword} />
                    </div>
                    <p style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center" }}>  {error}</p>
                    <div className='btnnnn'>
                        <Button variant="outlined"> <Link style={{ textDecoration: "none", color: "black", border: " 0px solid black" }} to={"/"}>Cancel</Link></Button>
                        <Button variant="contained" onClick={hancleauth}> {formstate == 0 ? "Login" : "Register"}</Button>
                    </div>
                </div>
            </div>
            {formstate === 1 ?
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={severity}
                        variant="filled"
                    >
                        {message}
                    </Alert>
                </Snackbar>
                : <>
                    <Snackbar

                        open={open}
                        autoHideDuration={4000}
                        message={message}
                    />
                </>}


        </div>
    );
}

export default Authentication;