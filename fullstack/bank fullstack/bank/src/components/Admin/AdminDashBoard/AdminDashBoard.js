
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./AdminDashBoard.css"
import CreateCustomer from '../createCustomer/createCustomer';
import Navbar from '../../Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from '../../Logout/Logout';


function AdminDashBoard() {
    console.log("admin")
    const Navigate = useNavigate()
    const [loggedInUser, updateLoggedInUser] = useState("loading")
    const [loggedInMessage, updateLoggedInMessage] = useState()
    const username = useParams().username
  
    const getLoggedInUser = async() =>{
        const resp = await axios.get("http://localhost:8000/api/v1/loggedInUser").catch((error)=>{
          return error;
        })
        if(resp.response){
          updateLoggedInMessage(resp.response.data.message)
          updateLoggedInUser(resp.response.data.data)
        }
        updateLoggedInMessage(null)
        updateLoggedInUser(resp.data.data)     
      }

    useEffect(() => {
        getLoggedInUser();
    }, )


    if(loggedInUser=="loading"){
        return(
          <>loading..</>
        )
      }
      else{
        if (!loggedInUser) {
          return(
            <>{loggedInMessage}
            <a onClick={()=>Navigate(`/`, { replace: true })}>Go to login</a>
            </>
          )
        }
        if (loggedInUser.username != username) {
          Navigate(`/`, { replace: true })
          return
        }
      
        if (loggedInUser.role != "Admin") {
          Navigate(`/`, { replace: true })
          return
        }
      }

    return (
        <>
            <Navbar 
                username={username}
                role={"admin"}
                LogOutButton={LogoutButton} />
                <div className='body'>
                <CreateCustomer/>
                </div>
        </>
    )
}

export default AdminDashBoard;
