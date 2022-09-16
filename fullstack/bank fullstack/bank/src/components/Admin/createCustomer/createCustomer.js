import { RemoveRedEye, RemoveRedEyeOutlined } from '@mui/icons-material';
import { getRoles } from '@testing-library/react';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


function CreateCustomer() {

    const [firstName, updateFirstname] = useState()
    const [lastName, updateLastname] = useState()
    const [username, updateUsername] = useState()
    const [password, updatePassword] = useState()
    const [role, updateRole] = useState("Customer")

    
    const [createMessage, updateCreateMessage] = useState()
    const [status, updateStatus] = useState("normal-message")
    const [updateMessage, updateUpdateMessage] = useState()
    const [renderCreate, updateRenderCreate] = useState(true)

    const [Roles, updateRoles] = useState()
    const getRoles = async () => {
        const resp = await axios.get("http://localhost:8000/api/v1/roles").catch((error) => {
            console.log(error)
            return
        })
        if (!resp) {
            return
        }
        if (resp.status == 200) {
            updateRoles(resp.data.data)
            updateRole(resp.data.data[0].role)
        }


    }

    const handlecreateCustomer = async () => {

        const resp = await axios.post("http://localhost:8000/api/v1/createUser", { firstName, lastName, username, password, role }).catch((error) => {
            return error
        })

        if (resp.response) {
            updateCreateMessage(resp.response.data.message)
            updateStatus("fail")
            return
        }

        if (resp.status == 201) {
            updateCreateMessage(resp.data.message)
            updateStatus("success")
            return
        }
        updateCreateMessage("something went wrong")
    }

   
    let RoleOptions
    
    if (Roles) {
        RoleOptions = Object.values(Roles).map((Role) => {
            return (<option value={Role.role}>{Role.role}</option>)
        })
    }

    if (renderCreate) {
        return (
            <>
                <div className="form-container">
                    <form >
                        <h1>create customer</h1>

                        <input type="text" placeholder='username'
                            onChange={(e) => updateUsername(e.target.value)}>
                        </input> <br></br>

                        <input type="password" placeholder='password'
                            onChange={(e) => updatePassword(e.target.value)}>
                        </input><br></br>

                        <input type="text" placeholder='firstname'
                            onChange={(e) => updateFirstname(e.target.value)}>
                        </input> <br></br>

                        <input type="text" placeholder='lastname'
                            onChange={(e) => updateLastname(e.target.value)}>
                        </input> <br></br>

                        <button type='submit' onClick={() => handlecreateCustomer()}>create customer</button> <br></br>
                        <label className={status}>{createMessage}</label>
                    </form>
                </div>
            </>
        )

    }
    
    ;
}

export default CreateCustomer