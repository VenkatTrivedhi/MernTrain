import './user.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Update, Delete, Edit } from '@mui/icons-material';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



const User = (props) => {
    const loadUsers = props.loadUsers
    const [message, updateMessage] = props.message
    const [status, updateStatus] = props.status

    const [user,updateUser] = useState(props.user)
    const firstName = user.firstName
    const lastName = user.lastName
    const role = user.role
    const isActive =user.isActive

    const username = user.credential.username
    const [showModal, updateShowModal] = useState(false)

    const [valueOftheField, updateValueOftheField] = useState() 
    const [Field, updateField] = useState() 



    useEffect(()=>{
        updateUser(props.user)
    },[props.user])

    const handleEdit = (e,property,value) => {
        e.preventDefault()
        updateValueOftheField(value)
        updateField(property)
        updateShowModal(true)
    }

    const deleteUser = async (e, user) => {
        const username = user.credential.username
        if (window.confirm(`deleting user with ${username}`)) {
            const resp = await axios.delete(`http://localhost:8000/api/v1/deleteuser/${username}`).catch(
                (error) => {
                    return error
                }
            )

            if(resp.response){
                updateMessage(resp.response.data.message)
                updateStatus("fail")
            }
            if (resp.status == 200) {
                updateMessage(resp.data.message)
                updateStatus("success")
                user.isActive = false
            }
            if (resp.status == 500) {
                updateMessage(resp.data.message)
                updateStatus("fail")
            }
        }
    }

    const reactivateUser = async (e, user) => {
        const firstname = user.firstName
        const lastname = user.lastName
        const username = user.credential.username
        const password = user.credential.password
        const role = user.role

        if (window.confirm(`reactivate user with ${username}`)) {
            const resp = await axios.post("http://localhost:8000/api/v1/createuser", { firstname, lastname, username, password, role }).catch(
                (error) => {
                    return error
                }
            )
            if(resp.response){
                updateMessage(resp.response.data.message)
                updateStatus("fail")
            }

            if (resp.status == 201) {
                updateMessage(resp.data.message)
                updateStatus("success")
                user.isActive = true
            }
        }
    }

    const handleModelHide=()=>{
        updateMessage("")
        updateShowModal(false)
    }


    const UpdateUser = (props) => {
        const [propertyTobeUpdated,updatePropertyToBeUpdated] = useState(Field)
        const [value,updateValueToBeUpdated] = useState(valueOftheField)
        

        const update = async (e) => {
            e.preventDefault()
            let resp = await axios.put(`http://localhost:8000/api/v1/updateuser/${username}`, { propertyTobeUpdated, value }).catch((error) => {
                updateMessage(error.response.data.message)
                updateStatus("fail")
                return error
            })

            if(resp.response){
                return
            }
    
            if (resp.status == 200) {
                updateMessage(resp.data.message)
                updateStatus("success")
                updateValueOftheField(value)
                updateUser(resp.data.data)
                return
            }
    
        }
    
        const handleUpdate = (e) => {
            e.preventDefault()
            updateValueToBeUpdated(e.target.value)
        }
    
    
        return (
            <Modal
    
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
    
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        update user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='form-container'>
                    <form >
                        {propertyTobeUpdated}:
                        <input type="text" defaultValue={value} onChange={(e) => handleUpdate(e)}
                            placeholder="value to be updated" ></input> <br></br>
                        <Button onClick={(e) => update(e)}>update user</Button><br></br>
                        <label>{message}</label> <br></br>
                    </form>
                </Modal.Body> .
                <Modal.Footer >
                    <Button onClick={(e) => props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    
    console.log(firstName)
    return (
        <>
        <tr className="table-row" name="normal">
            <td className="firstName" >

                <label>
                    <label>{user.firstName}</label>
                    {isActive ?
                        <label className='icon' onClick={(e) => handleEdit(e,"firstName",firstName)}><Edit /></label> :
                        <></>
                    }
                </label>
            </td>

            <td className="lastName" >
                <label id={`${user.credential.username} lastName input`} >
                    {lastName}
                    {isActive ?
                        <label className='icon' onClick={(e) => handleEdit(e,"lastName",lastName)}><Edit /></label> :
                        <></>
                    }
                </label>
            </td>

            <td className="role">
                {role}
            </td>

            <td className="isActive" id={`${user.credential.username} isActive`}>
                {isActive ? "active" : "deactived"}
            </td>

            <td>
                {isActive ?

                    <label className='icon' onClick={(e) => deleteUser(e, user)}>
                        <Delete />
                    </label>

                    :
                    <label className='icon' onClick={(e) => reactivateUser(e, user)}>
                        activate
                    </label>
                }

            </td>
            <UpdateUser username={username}
                show={showModal}
                onHide={() => handleModelHide()} />
        </tr>
        </>
    )
}


export default User