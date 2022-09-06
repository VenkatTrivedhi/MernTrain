import "./contactDetailsList.css";
import axios from 'axios';
import { Save, Update, Delete, Edit, Details, Face, Cancel, CheckCircle, Close } from '@mui/icons-material';
import { useState, useEffect } from "react";



function ContactDetail(props) {
    const [details,updateDetails] = useState(props.details)
    const [value, updateValue] = useState(details.value)
    const [type, updateType] = useState(details.type)
    const [editMode, updateEditMode] = useState(false)
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")
    const username = props.username
    const contactName = props.contact
    const loadContacts = props.loadContacts


    const hadleEdit = (e) => {
        e.preventDefault()
        updateEditMode(true)
    }

    const handleValueChange = (e) => {
        e.preventDefault()
        updateValue(e.target.value)
    }

    const hadleSave = async (e) => {
        e.preventDefault()
        const propertyTobeUpdated = "value"
        const resp = await axios.put(`http://localhost:8000/api/v1/updateContactDetails/${username}/${contactName}/${type}`, { propertyTobeUpdated, value }).catch(((err) => {
            return err
        }))
        if (resp.response){
            updateMessage(resp.response.data.message)
            updateStatus('fail')
            updateEditMode(false)
            return
            }
        
        if (resp.status == 200) {
            updateMessage(resp.data.message)
            updateStatus("success")
            updateDetails(resp.data.data)
            updateEditMode(false)
            return
        }
        updateEditMode(false)
    }

    const handleUpdateCancel = (e) => {
        e.preventDefault()
        updateEditMode(false)
        updateValue(props.details.value)
    }

    const hadleDelete = async (e) => {
        e.preventDefault()
        if (window.confirm(`deleting contact type ${type}`)) {
            const resp = await axios.delete(`http://localhost:8000/api/v1/deleteContactDetails/${username}/${contactName}/${type}`).catch(
                (err) => {return err}
            )
            if(resp.response){
                updateMessage(resp.response.data.message)
                updateStatus("fail")
            }
            if (resp.status == 200) {
                updateMessage(resp.data.message)
                updateStatus("success")
                updateDetails(resp.data.data)
            }
        }
    }

    const hadleReactivate = async () => {

    }

    window.addEventListener('click', function(eventexit) {
        updateStatus("normal-message")
        updateMessage("")
    })

    if (details.isActive) {

        if (!editMode) {

            return (
                <div className="details">
                    <label className="type">{type}</label><br></br>
                    <div className="value">
                        <label>{value}</label>
                        <label className="edit-icons">
                            <label className="Edit " onClick={(e) => hadleEdit(e)}><Edit /></label>
                            <label className="Delete" onClick={(e) => hadleDelete(e)}><Delete /></label>
                        </label>
                    </div> <br></br>
                    <label className={status}>{message}</label><br></br>

                </div>


            )
        }
        else {
            return (
                <div className="details">

                    <label className="type" >{type}</label><br></br>
                    <div className="value">
                        <input className="value-input" value={value}
                            onChange={(e) => handleValueChange(e)}>
                        </input>
                        <label className="edit-icons">
                            <label className="Edit" onClick={(e) => hadleSave(e)}><CheckCircle /></label>
                            <label className="close" onClick={(e) => handleUpdateCancel(e)}><Cancel /></label>
                            <label className="Delete " onClick={(e) => hadleDelete(e)}><Delete /></label>
                        </label>
                    </div><br></br>
                    <label className={status}>{message}</label><br></br>

                </div>
            )
        }
    }
    else {
        if (status != "normal-message") {
            return (
                <label className={status}>{message}</label>
            )
        }
    }

}

export default ContactDetail;