
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import ContactList from '../contactList/contactList';
import CreateContact from '../createContact/createContact';
import LogoutButton from '../../Logout/Logout';

function UserDashBoard() {
  const Navigate = useNavigate()
  const username = useParams().username
  const [loggedInUser,updateLoggedInUser] = useState("loading")
  const [bodyComponentToBeRender, updateBodyComponentToBeRender] = useState(<ContactList/>)
  const [bodyNameToBeRender, updateBodyNameToBeRender] = useState("all contacts")
  const [loggedInMessage, updateLoggedInMessage] = useState()


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

    if (bodyNameToBeRender == "create contact") {
      updateBodyComponentToBeRender(<CreateContact />)
    }
    if (bodyNameToBeRender == "all contacts") {
      updateBodyComponentToBeRender(<ContactList />)
    }           
  }, [bodyNameToBeRender])

  if(loggedInUser=="loading"){
    return(
      <>loading</>
    )
  }
  else{
    if (!loggedInUser) {
      Navigate(`/`, { replace: true })
      return
    }
    if (loggedInUser.username != username) {
      Navigate(`/`, { replace: true })
      return
    }
  
    if (loggedInUser.role != "User") {
      Navigate(`/`, { replace: true })
      return
    }
  }
  
  return (
    <>
    <Navbar updatebodyComponent={updateBodyNameToBeRender} username={username} components={["all contacts","create contact"]} 
      role={"User"}
      LogOutButton={LogoutButton} />      
      {bodyComponentToBeRender}
    </>
  )
}

export default UserDashBoard;
