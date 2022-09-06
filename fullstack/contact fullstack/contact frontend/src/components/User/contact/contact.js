import "./contact.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { Save, Update, Delete, Edit, Details, Face, MoreVert, Done, Close } from '@mui/icons-material';
import ContactDetail from "../contactDetailsList/contactDetailsList";
import AddContactDetails from "../addContactDetails/addContactDetails";
import { type } from "@testing-library/user-event/dist/type";



function Contact(props) {

    const [contact,updateContact] = useState(props.contact)
    const loadContacts = props.loadContacts
    const paramsUsername = useParams().username
    const [messageOfContact, updateMessageOfContact] = useState("")
    const [statusOfContact, updateStatusOfContact] = useState("normal-message")
    const [editMode, updateEditMode] = useState(false)

    console.log(contact)
    const [firstName,updateFirstName] = useState(contact.firstName)
    const [lastName,updateLastName] = useState(contact.lastName)
    
    const [dropdown, updateDropdown] = useState("details-menulist-collapsed")
    const [contactDetailsStatus,updateContactDetailsStatus] = useState("contact-details-collapsed")

    const [addDetails, updateAddDetails] = useState(<></>)
    const [isContactDeleted, updateIsContactDeleted]= useState(false)
    const [addComponentStatus, updateAddComponentStatus] = useState()

   useEffect(()=>{
    updateContact(props.contact)
    updateLastName(props.contact.lastName)
    updateFirstName(props.contact.firstName)
   },[props.contact])

    const deleteContact = async (contact) => {

        const contactName = contact.fullName
        if (window.confirm(`deleting contact with contact name${contactName}`)) {
            const resp = await axios.delete(`http://localhost:8000/api/v1/deletecontact/${paramsUsername}/${contactName}`).catch(
                (err) => {
                    updateMessageOfContact(err.response.data.message)
                    updateStatusOfContact("fail")
                    return err
                }
            )
            if(resp.response){
                return
            }
            if (resp.status == 200) {
                updateMessageOfContact(resp.data.message)
                updateStatusOfContact("success")
                contact.isActive = false
            }
        }
    }

    const reactivateContact = async (contact) => {
        const firstname = contact.firstName
        const lastname = contact.lastName
        if (window.confirm(`reactivate contact with name ${contact.fullName}`)) {
            const resp = await axios.post(`http://localhost:8000/api/v1/createcontact/${paramsUsername}`, { firstname, lastname }).catch(
                (err) => {
                    updateMessageOfContact(err.response.data.message)
                    updateStatusOfContact("fail")
                    return
                }
            )
            if(resp.response){
                return
            }
            if (resp.status == 201) {
                updateMessageOfContact(resp.data.message)
                updateStatusOfContact("success")
            }
        }
    }

    const removeMessage = () => {
        updateMessageOfContact("")
        updateStatusOfContact("normal-message")
    }

    const hadleEdit = (e) => {
        e.preventDefault()
        updateEditMode(true)
    }

    const hadlefirstName = (value) => {
        updateFirstName(value)
    }

    const hadlelastName = (value) => {
        updateLastName(value)
    }

    const handleUpdateCancel = (e) => {
        e.preventDefault()
        updateEditMode(false)
        firstName = contact.firstName
        lastName =contact.lastName
    }

    const hadleShowMenu = () => {
        if (dropdown == "details-menulist") {
            updateDropdown("details-menulist-collapsed")
        }
        else {
            updateDropdown("details-menulist")
        }
    }
    
    const removeAdd=(e)=>{
        props.loadContacts()
        updateAddComponentStatus("initial")
        updateAddDetails(<></>)
    }

    const handleAdd=(e)=>{
        updateAddComponentStatus("initial")
        updateAddDetails(<AddContactDetails contact={contact}
            removeAdd={removeAdd}
            addComponentStatus={[addComponentStatus,updateAddComponentStatus]} 
            loadContacts={loadContacts} />)
    }


    const saveUpdate= async()=>{

        let propertyTobeUpdated= "firstName"
        let value = firstName

        console.log(contact.fullName)
        const firstResp = await axios.put(`http://localhost:8000/api/v1/updatecontact/${paramsUsername}/${contact.fullName}`,{propertyTobeUpdated,value}).catch((error)=>{return error})
        if(firstResp.response){
            updateStatusOfContact("fail")
            console.log(firstResp.response)
            updateMessageOfContact(firstResp.response.data.message)
            return
        }
        if(firstResp.status==200){
            updateContact(firstResp.data.data)
            updateFirstName(firstResp.data.data.firstName)
            contact.fullName = firstResp.data.data.fullName
            updateStatusOfContact("success")
            updateMessageOfContact(firstResp.data.message)
        }
        
        propertyTobeUpdated= "lastName"
        value = lastName
        console.log(contact.fullName)
        const lastResp = await axios.put(`http://localhost:8000/api/v1/updatecontact/${paramsUsername}/${contact.fullName}`,{propertyTobeUpdated,value}).catch((error)=>{return error})
        if(lastResp.response){
            updateStatusOfContact("fail")
            updateMessageOfContact(lastResp.response.data.message)
            return
        }
        if(firstResp.status==200 && lastResp.status==200){
            updateContact(lastResp.data.data)
            updateLastName(lastResp.data.data.lastName)
            contact.fullName = lastResp.data.data.fullName
            updateStatusOfContact("success")
            updateMessageOfContact("contact name updated successfully")
            updateEditMode(false)
        }
      }
        

    const ShowDetails=()=>{
        if(contactDetailsStatus=="contact-details-collapsed"){
            updateContactDetailsStatus("contact-details")
        }
    }

    const hideDetails=()=>{
        if(contactDetailsStatus=="contact-details"){
            updateContactDetailsStatus("contact-details-collapsed")
        }
    }

    window.addEventListener('click', function(eventexit) {
        updateMessageOfContact("")
        updateStatusOfContact("normal-message")
    })


    let ContactDetails
    if (contact.contactDetails != []) {
        ContactDetails = Object.values(contact.contactDetails).map(details => {
            return (

                <ContactDetail details={details}
                    username={paramsUsername}
                    contact={contact.fullName}
                    loadContacts={loadContacts} />

            )
        }
        )
    }
    if(!contact.isActive){
        return(
            <label className={statusOfContact} onClick={() => removeMessage()}>{messageOfContact}</label>
        )
    }
    if (contact.isActive) {

        if (!editMode) {
            return (

                <div className="card-area">

                    <label className={statusOfContact} onClick={() => removeMessage()}>{messageOfContact}</label><br></br>
                    <div className="card" >
                        <div className="contact" onClick={()=>ShowDetails()}>
                            <div className="fullname">
                                <Face />
                                <label>{contact.fullName}</label>
                            </div>

                            <div className="deletecontact">

                                <div className='icon'
                                    onClick={() => hadleShowMenu()}>
                                    <MoreVert />
                                </div>

                            </div>

                            <ul className={dropdown} onClick={()=>hadleShowMenu()}>
                                <li onClick={(e) => deleteContact(contact)}>Delete</li>
                                <Divider />
                                <li onClick={(e) => hadleEdit(e)}>Edit</li>
                                <Divider />
                                <li onClick={(e)=> handleAdd(e)}>Add Details</li>
                                <Divider />
                                <li>Show Deleted</li>
                            </ul>

                        </div>


                        <div className={contactDetailsStatus}>
                            <Close onClick={()=>hideDetails()}/>
                            {ContactDetails}<br></br>
                            {addDetails}
                        </div>

                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="card-area">

                    <label className={statusOfContact} onClick={() => removeMessage()}>{messageOfContact}</label><br></br>
                    <div className="card" >
                        <div className="contact">
                            <div className="fullname">
                                <Face />
                                <input
                                    onChange={(e) => hadlefirstName(e.target.value)}
                                    value={firstName}>

                                </input>
                                <input
                                    onChange={(e) => hadlelastName(e.target.value)}
                                    value={lastName}>
                                </input>
                            </div>

                            <div className="deletecontact">
                                <div className="icon" 
                                onClick={()=>saveUpdate()}>
                                    <Edit />
                                </div>
                                <div className="icon" onClick={(e) => handleUpdateCancel(e)} >
                                    <Close />
                                </div>

                                <div className='icon'
                                    onClick={() => hadleShowMenu()}>
                                    <MoreVert />
                                </div>
                            </div>
                        </div>


                        <div className="contact-details">
                            {ContactDetails}<br></br>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default Contact