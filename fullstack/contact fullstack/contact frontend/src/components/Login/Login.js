import './Login.css';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import LogoutButton from '../Logout/Logout';

function Login() {

    const [loggedInUser, updateLoggedInUser] = useState("loading")

    const [username, updateUsername] = useState()
    const [password, updatePassword] = useState()
    const [loginMessage, updateLoginMessage] = useState()
    let Navigate = useNavigate()

    const getLoggedInUser = async () => {
        const resp = await axios.get("http://localhost:8000/api/v1/loggedInUser").catch((e) => {
            console.log(e)
        })
        console.log(resp)
        updateLoggedInUser(resp.data)
    }

    useEffect(() => {
        getLoggedInUser()
    }, [])

    const handleLogin = async (e) => {

        e.preventDefault()

        console.log(username, password)

        const resp = await axios.post("http://localhost:8000/api/v1/login", { username, password }).catch((error) => {
            return error
        }
        )

        if (resp.response) {
            updateLoginMessage(resp.response.data.message)
            return
        }

        if (resp.data.data.role == "User") {

            Navigate(`/userDashBoard/${username}`, { replace: true })
            return
        }
        if (resp.data.data.role == "Admin") {
            console.log("loged in");
            Navigate(`/adminDashBoard/${username}`, { replace: true })
            return
        }
        else {
            //not updatating user
            updateLoginMessage(resp.data.message)
            return
        }
    }

    const handleUsernameChange = (e, value) => {
        e.preventDefault()
        updateUsername(value)
    }

    const handlePasswordChange = (e, value) => {
        e.preventDefault()
        updatePassword(value)
    }

    const EmptyCompnent = () => {
        return (
            <></>
        )
    }

    if (loggedInUser == "loading") {
        return (
            <>loading</>
        )
    }
    else {
        if (loggedInUser) {

            if (loggedInUser.role == "Admin") {
                Navigate(`/adminDashBoard/${loggedInUser.username}`, { replace: true })
                return
            }

            if (loggedInUser.role == "User") {
                Navigate(`/userDashBoard/${loggedInUser.username}`, { replace: true })
                return
            }
        }
    }

    return (
        <>
            <Navbar LogOutButton={EmptyCompnent} />
            <div className='form-container'>
                <form >

                    <input type="text" placeholder='username' onChange={(e) => handleUsernameChange(e, e.target.value)}></input> <br></br>
                    <input type="password" placeholder='password' onChange={(e) => handlePasswordChange(e, e.target.value)}></input> <br></br>
                    <button onClick={(e) => handleLogin(e)}>login</button> <br></br>
                    <label>{loginMessage}</label>
                </form>
            </div>
        </>
    );
}

export default Login;
