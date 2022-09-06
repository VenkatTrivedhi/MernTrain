import axios from 'axios';
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UpdateUser = (props) => {
    const username = props.username
    const propertyTobeUpdated = props.property
    const [value, updateValue] = useState(props.value)
    const updateChangedValue = props.updateChangedValue

    const [message, updateUpdatedMessage] = props.message
    const [status, updateStatus] = props.status
    console.log(username, propertyTobeUpdated, value)

    const update = async (e) => {
        e.preventDefault()
        console.log(username, propertyTobeUpdated, value)
        let resp = await axios.put(`http://localhost:8000/api/v1/updateuser/${username}`, { propertyTobeUpdated, value }).catch((e) => {
            updateUpdatedMessage("property could not be updated")
            updateStatus("fail")
            console.log("error")
            return
        })

        if (resp.status == 200) {
            updateChangedValue(value)
            updateUpdatedMessage("property updated successfully")
            updateStatus("success")
            updateChangedValue(value)
            props.loadUsers()
            return
        }

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        updateValue(e.target.value)
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
                    <input type="text" defaultValue={props.value} onChange={(e) => handleUpdate(e)}
                        placeholder={value} ></input> <br></br>
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


export default UpdateUser