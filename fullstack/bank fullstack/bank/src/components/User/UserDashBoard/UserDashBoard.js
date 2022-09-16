
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import Withdraw from '../withdraw/withdraw';
import Deposit from '../deposit/deposit';
import Tranfer from '../transfer/transfer';
import Transaction from '../transactions/transaction';
import LogoutButton from '../../Logout/Logout';
import ProfilePicture from '../../ProfilePicture/profilePicture';
import image from "../../../images/pngwing.com.png";


function UserDashBoard() {
  const Navigate = useNavigate()
  const username = useParams().username
  const [loggedInUser,updateLoggedInUser] = useState("loading")
  const [bodyComponentToBeRender, updateBodyComponentToBeRender] = useState(<Transaction/>)
  const [bodyNameToBeRender, updateBodyNameToBeRender] = useState("all contacts")
  const [loggedInMessage, updateLoggedInMessage] = useState()
  const [image,updateImage] = useState()


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
    updateImage(resp.data.data.image)     
  }

  useEffect(() => {
    getLoggedInUser()
    if (bodyNameToBeRender == "withdraw") {
      updateBodyComponentToBeRender(<Withdraw/>)
    }
    if (bodyNameToBeRender == "deposit") {
      updateBodyComponentToBeRender(<Deposit/>)
    }           
    if (bodyNameToBeRender == "tranfer") {
      updateBodyComponentToBeRender(<Tranfer/>)
    }
    if (bodyNameToBeRender == "transaction") {
      updateBodyComponentToBeRender(<Transaction/>)
    }
    if (bodyNameToBeRender == "profile-picture") {
      updateBodyComponentToBeRender(<ProfilePicture picture={[image,updateImage]}/>)
    }
              
  }, [bodyNameToBeRender])

  
  
  return (
    <>
    <Navbar updatebodyComponent={updateBodyNameToBeRender} 
      username={username} 
      components={["withdraw","deposit","tranfer","transaction"]} 
      role={"Customer"}
      LogOutButton={LogoutButton} 
      Image = {image}/>
      <div className='body'>
      {bodyComponentToBeRender}
      </div>   
      
    </>
  )
}

export default UserDashBoard;
