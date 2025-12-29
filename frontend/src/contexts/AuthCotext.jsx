import { Children, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import httpStatus from "http-status";
import server from "../environment";

export const AuthContext = createContext({});


const client = axios.create({
    baseURL: `${server}/api/v1/users`
})

export const AuthProvider = ({ children }) => {
    const authcontext = useContext(AuthContext);
    const [usedata, setusedata] = useState(authcontext);
    const router = useNavigate();

    const handleregister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handlelogin = async (username, password) => {
        try {
            let login = await client.post("/login", {
                username: username,
                password: password,
            });

            console.log(username, password)
            console.log(login.data)


            if (login.status === httpStatus.OK) {
                localStorage.setItem("token", login.data.token);
                router(`/home`);
            }
        } catch (err) {
            throw err;
        }
    }

     const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }
    const addToUserHistory = async (meetingCode) => {
        try{
            let request = await client.post("/add_to_activity" ,{
                token : localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request;
        }catch(e){
            throw e;
        }
    }

    const getuderdata = async() => {
        try{
            let request = await client.get("/getuserdata"  , {
                params: {
                    token:  localStorage.getItem("token")
                }
            });
            return request.data
        }catch (e) {
            throw e;
        }
    }

    const data = { usedata, setusedata, getuderdata, addToUserHistory,  getHistoryOfUser, handleregister, handlelogin };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}