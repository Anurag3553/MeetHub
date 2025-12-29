import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';



// import Button from "@mui/material";


function LandingPage() {
    return (
        <div className='landingpagecontainer'>
            <nav>
                <div className='navheader'>
                    <img style={{ width: "10%", borderRadius: "10px" }} src="/imagecopy.png" alt="logo" />
                    <h2> <span>Meet</span>Hub</h2>
                </div>

                <div className='navbar'>
                    <Link style={{textDecoration:"none" , color:"white"}} to={"/auth"}>Join-as-Guest</Link>
                    <Link style={{textDecoration:"none" , color:"white"}} to={"/auth"}>Register</Link>
                    <button > <Link style={{textDecoration:"none" , color:"white"}} to={"/auth"}>Login</Link></button>
                </div>
            </nav>

            <div className="landingmaincontainer">
                <div className='one'>
                    <div className='mid'>
                        <h1><span style={{color:"orange"}}>Connect</span> with your <br></br> Loved Once</h1>
                        <p>Cover a disance on MeetHub Video Meeting</p>
                        {/* <div role='button'>
                            Get Started
                        </div> */}
                        <button> <Link style={{textDecoration:"none" , color:"white"}} to={"/auth"}>Get Started</Link> </button>
                    </div>
                </div>
                <div className='two'>
                    <div className='logoimg'>
                        <img style={{ width: "90%", borderRadius: "10px" }} src='/video.jpg' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
