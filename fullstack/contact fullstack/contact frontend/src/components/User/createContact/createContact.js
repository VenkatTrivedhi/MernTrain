import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

function CreateContact() {
    const [firstname, updateFirstname] = useState()
    const [lastname, updateLastname] = useState()

    const [createMessage, updateCreateMessage] = useState()
    const [createStatus, updateCreateStatus] = useState("")
    const paramsUsername = useParams().username

    

    const handleCreateContact = async (e) => {
        e.preventDefault()
        const resp = await axios.post(`http://localhost:8000/api/v1/CreateContact/${paramsUsername}`, { firstname, lastname }).catch((error)=>{return error})
        if(resp.response){
            updateCreateMessage(resp.response.data.message)
            updateCreateStatus("fail")
        }        
        if (resp.status == 201) {
            console.log(resp)
            updateCreateMessage(resp.data.message)
            updateCreateStatus("success")
        }
        
    }

    return (
        <>
            <div className="form-container">
                <form >
                    <h1>create contact</h1>
                    <input type="text" placeholder='firstname' onChange={(e) => updateFirstname(e.target.value)}></input> <br></br>
                    <input type="text" placeholder='lastname' onChange={(e) => updateLastname(e.target.value)}></input> <br></br>
                    <button onClick={(e)=>handleCreateContact(e)}>create contact</button> <br></br>
                    <div className={createStatus}>{createMessage}</div>
                </form>
            </div>

        </>
    )
}


export default CreateContact