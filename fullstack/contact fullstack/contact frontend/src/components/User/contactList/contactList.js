import "./contactList.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { Save, Update, Delete, Edit, Details, Face, MoreVert } from '@mui/icons-material';
import { Modal, Pagination } from "@mui/material";
import Contact from "../contact/contact";



function ContactList(props) {


    const [ContactList, updateList] = useState([])
    //let ContactList = []
    const [listLength, updateListLength] = useState(0)

    let Navigate = useNavigate()

    const [limit, updateLimit] = useState(3)
    const [page, updatePage] = useState(1)
    const [loginStatus, updateloginStatus] = useState("")
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")

    const [value, updateValue] = useState()
    const [propertyTobeUpdated, updateProperty] = useState()
    const [contactname, updateContactName] = useState()
    const [showModal, updateShowModal] = useState(false)

    const paramsUsername = useParams().username


    const loadContacts = async () => {

        let resp = await axios.get(`http://localhost:8000/api/v1/getAllContacts/${paramsUsername}/?limit=${limit}&page=${page}`).catch(e => {
            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
            if (e.response.status == 403) {
                updateloginStatus("Unauthorized access,cannot get contacts of others")
                return
            }
        })
        if (resp.data != null) {
            updateList(resp.data.data)
            updateListLength(resp.data.length)
            //ContactList = resp.data.data
           
        }
    }

    const [OptionForLimit,updateOptionForLimit] = useState()
    const getOptionsForLimitOfPage= async()=>{
            const resp = await axios.get("http://localhost:8000/api/v1/limitOfPage").catch((error)=>{
              console.log(error)
              return
            })
            if(!resp){
                return
            }
            if(resp.status==200){
                updateOptionForLimit(resp.data.data)
            }
        }

    useEffect(() => {
        loadContacts();
        getOptionsForLimitOfPage();
    }, [limit,page])


    const handleLimitChange = (limit) => {
        const Limit = limit * 1
        updateLimit(Limit)
    }

    const handlePageChange = (e,page) => {
        const Page = page * 1
        updatePage(Page)
    }

    window.onclick = (e) => {
        updateStatus("normal-message")
        updateMessage("")
    }


    let NumberOfContactsPerPage
    if(OptionForLimit){
        NumberOfContactsPerPage = Object.values(OptionForLimit).map((option)=>{
            return(
                <option value={option}>{option}</option>
            )
        })
    }


    let CardOfContacts
    console.log(ContactList)
    console.log(limit, page)

    if (ContactList != []) {
        CardOfContacts = Object.values(ContactList).map((contact) => {
            return (
                <Contact
                    contact={contact}
                    loadContacts={loadContacts}
                />
            )
        })
    }


    if (loginStatus == "Unauthorized") {
        Navigate(`/`, { replace: true })
        return
    }

    return (
        <>
            <div className={status}>{message}</div>
            <div className='Cards-container'>
                {CardOfContacts}
                <div className="pagination">
                    <label>No of Contacts</label>
                    <select  onChange={(e) => handleLimitChange(e.target.value)}>
                        {NumberOfContactsPerPage}
                    </select>
                    <Pagination count={Math.ceil(listLength / limit)} onChange={(e, page) => handlePageChange(e,page)} />
                </div>
            </div>

        </>
    )
}
export default ContactList