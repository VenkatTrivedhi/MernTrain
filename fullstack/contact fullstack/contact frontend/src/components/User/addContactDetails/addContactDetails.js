import "./addContactDetails.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { Save, Update, Delete, Edit, Details, Face, MoreVert, Done, Add, Close, CheckCircle, Cancel } from '@mui/icons-material';
import ContactDetail from "../contactDetailsList/contactDetailsList";

const AddContactDetails = (props) => {
    const [type, updateNewType] = useState()
    const [value, updateNewValue] = useState()
    const [addComponentStatus, updateAddComponentStatus] = props.addComponentStatus
    const paramsUsername = useParams().username
    const fullName = props.contact.fullName
    const loadContacts = props.loadContacts
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")

    
    const handleTypeChange = (e) => {
        updateNewType(e.target.value)
    }

    const handleValueChange = (e) => {
        updateNewValue(e.target.value)
    }

    const handleAdd = async (e) => {
        const resp = await axios.post(`http://localhost:8000/api/v1/createContactDetails/${paramsUsername}/${fullName}`, { type, value }).catch((error) => {
            return error
        })
        if (resp.response) {
            updateStatus("fail")
            updateMessage(resp.response.data.message)
            return
        }
        if (resp.status == 201) {
            updateStatus("success")
            updateMessage(resp.data.message)
            updateAddComponentStatus("added")
            props.removeAdd()
        }
    }
 
    const setToinitial=()=>{
        updateAddComponentStatus("initial")
        loadContacts()
    }


    window.addEventListener('click', function(eventexit) {
        updateStatus("normal-message")
        updateMessage("")
    })

    if (addComponentStatus == "initial") {
       
            return (
                <div className="details">
                    <label className="type" >
                        <input className="value-input" value={type}
                            onChange={(e) => handleTypeChange(e)}
                            placeholder="type">
                        </input>
                    </label><br></br>
                    <label className="value">
                        <input className="value-input" value={value}
                            onChange={(e) => handleValueChange(e)}
                            placeholder="value">
                        </input>

                        <div className="edit-icons">
                            <label onClick={(e) => handleAdd(e)}><CheckCircle/></label>
                            <label onClick={(e) => props.removeAdd()}><Cancel/></label>
                            </div>
                        
                    </label>
                    

                    <label className={status}>{message}</label><br></br>

                </div>
            )
        }
    
    if(addComponentStatus == "added"){
            return (
                <label className={status}>{message}</label>
            )
    }
    if(addComponentStatus=="removed"){
        return(
            <div className="add-icon">
            <lebel className="icon" onClick={()=>setToinitial()}>
                <Add/>
            </lebel>
            </div>
        )
    }
}


export default AddContactDetails