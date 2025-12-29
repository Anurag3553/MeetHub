import React, { useContext, useEffect, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthCotext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Box from '@mui/material';

import '../App.css';
import { use } from 'react';

function Home() {

    let navigate = useNavigate();
    const { addToUserHistory } = useContext(AuthContext);
    const [meetingCode, setmeetingcode] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    let handlejoinvideocall = async () => {
        if (meetingCode.trim() === "") {
            setMessage("Meeting code is required");
            setOpen(true);
            return;
        }

        if (meetingCode.length < 6) {
            setMessage("Meeting code must be at least 6 characters");
            setOpen(true);
            return;
        }
        setMessage("Joined successfully!");
        setOpen(true);
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }
    const handleClose = () => {
        setOpen(false);
    };

    let handlesetmeeting = (event) => {
        setmeetingcode(event.target.value);
    }

    let handleclicklogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    let handlehistoryclick = () => {
        navigate("/history")
    }
    
   

    return (

        <div className='homecontainer'>
            <nav>
                <div className='logo'>
                    <img style={{ width: "8%", borderRadius: "10px" }} src="/imagecopy.png" alt="logo" />
                    <h2 style={{ fontSize: "2rem" }}><span style={{ color: "rgb(37, 96, 223)", fontSize: "2rem" }}>Meet</span>Hub</h2>
                </div>
                <div className='profile'>

                    <Button onClick={handlehistoryclick} variant="outlined" startIcon={< HistoryIcon />}>
                        History
                    </Button>

                    <Button variant="contained" endIcon={<LogoutIcon />} color="error" onClick={handleclicklogout}> Logout</Button>
                </div>
            </nav>
            <div className="mainhomecontaint">
                <div className="homeleft">
                    <div className='homeone'>
                        <h1 style={{ fontSize: "3rem" }}>Video calls and Metings for everyone  </h1>
                        <p style={{ color: "gray", fontSize: "1.4rem", textAlign: "center" }}>Connect, collaborate, and celebrate from anywhere with  MeetHub</p>
                    </div>
                    <div className="hometwo">
                        <TextField style={{ width: "40%" }} onChange={handlesetmeeting} id="outlined-basic" label="Create-Meeting-Code" variant="outlined" />
                        <Button variant="contained" onClick={handlejoinvideocall} >Join</Button>

                    </div>
                </div>
                <div className="homeright">
                    <img style={{ width: "70%", borderRadius: "10px" }} src="/joinmeeting.png" alt="logo" />
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={message.includes("success") ? "success" : "error"}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default withAuth(Home);