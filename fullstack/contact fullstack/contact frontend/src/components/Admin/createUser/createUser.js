import { RemoveRedEye, RemoveRedEyeOutlined } from '@mui/icons-material';
import { getRoles } from '@testing-library/react';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


function CreateUser() {

    const [firstname, updateFirstname] = useState()
    const [lastname, updateLastname] = useState()
    const [username, updateUsername] = useState()
    const [password, updatePassword] = useState()
    const [role, updateRole] = useState()

    const [usernameTobeUpdated, updateUsernameTobeUpdated] = useState()
    const [propertyTobeUpdated, updatePropertyTobeUpdated] = useState()
    const [value, updateValue] = useState()

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

    const handleCreateUser = async () => {

        const resp = await axios.post("http://localhost:8000/api/v1/createuser", { firstname, lastname, username, password, role }).catch((error) => {
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

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        const resp = await axios.post(`http://localhost:8000/api/v1/updateuser/${usernameTobeUpdated}`, { propertyTobeUpdated, value }).catch((error) => { return error })

        if (resp.response) {
            if (resp.response.data.message) {
                updateUpdateMessage(resp.response.data.message)
            }
        }

        if (resp.status == 200) {
            updateUpdateMessage(resp.data.message)
            return
        }
    }

    const changeRender = (e) => {

        if (renderCreate == true) {
            updateRenderCreate(false)
        }
        else {
            updateRenderCreate(true)
        }
    }

    useEffect(() => {
        getRoles()
    }, []
    )

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
                        <h1>create user</h1>

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

                        <select onChange={(e) => updateRole(e.target.value)}>
                            {RoleOptions}
                        </select> <br></br>

                        <button type='submit' onClick={() => handleCreateUser()}>create user</button> <br></br>
                        <button className='link' onClick={(e) => changeRender(e)}>update user</button> <br></br>
                        <label>{renderCreate}</label><br></br>
                        <label className={status}>{createMessage}</label>
                    </form>
                </div>
            </>
        )

    }
    else {
        return (
            <>
                <div className='form-container'>
                    <form onSubmit={handleUpdateUser}>
                        <h1>update user</h1>
                        <input type="text" placeholder='username' onChange={(e) => updateUsernameTobeUpdated(e.target.value)}></input> <br></br>
                        <input type="text" placeholder='property to be updated' onChange={(e) => updatePropertyTobeUpdated(e.target.value)}></input> <br></br>
                        <input type="text" placeholder='value to be updated' onChange={(e) => updateValue(e.target.value)}></input> <br></br>
                        <button>update user</button> <br></br>
                        <button className='link' onClick={() => changeRender()}>create new user</button> <br></br>
                        <label className={status}>{updateMessage}</label> <br></br>
                        <label>{renderCreate}</label>
                    </form>
                </div>
            </>
        )
    }
    ;
}

export default CreateUser