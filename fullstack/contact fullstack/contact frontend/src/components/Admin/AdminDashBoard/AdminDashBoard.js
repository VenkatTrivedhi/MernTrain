
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./AdminDashBoard.css"
import UsersList from '../userList/userList';
import CreateUser from '../createUser/createUser';
import Navbar from '../../Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from '../../Logout/Logout';


function AdminDashBoard(props) {
    console.log("admin")
    const Navigate = useNavigate()
    const [loggedInUser, updateLoggedInUser] = useState("loading")
    const [loggedInMessage, updateLoggedInMessage] = useState()
    const username = useParams().username
    const [bodyComponentToBeRender, updateBodyComponentToBeRender] = useState(<UsersList />)
    const [bodyNameToBeRender, updateBodyNameToBeRender] = useState("all users")


    const [isAdmin, setIsAdmin] = useState(false)

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
        getLoggedInUser()

        if (bodyNameToBeRender == "all users") {
            updateBodyComponentToBeRender(<UsersList />)
            return
        }
        if (bodyNameToBeRender == "create user") {
            updateBodyComponentToBeRender(<CreateUser />)
            return
        }
    }, [bodyNameToBeRender])


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
            <Navbar updatebodyComponent={updateBodyNameToBeRender}
                components={["all users", "create user"]}
                username={username}
                role={"admin"}
                LogOutButton={LogoutButton}
                LoggedInUser={props.loggedInUser} />
            {bodyComponentToBeRender}
        </>
    )
}

export default AdminDashBoard;
