import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userList.css";
import { Save, Update, Delete, Edit, Key } from '@mui/icons-material';
import { Pagination } from "@mui/material";
import User from '../user/user';

function UsersList(props) {

    const [UserList, updateList] = useState([])
    const [listLength, updateListLength] = useState()

    let Navigate = useNavigate()

    const [limit, updateLimit] = useState(3)
    const [page, updatePage] = useState(1)
    const [loginStatus, updateloginStatus] = useState("")
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")

    const [value, updateValue] = useState()
    const [propertyTobeUpdated, updateProperty] = useState()
    const [username, updateUsername] = useState()
    const [showModal, updateShowModal] = useState(false)

    const [updated, updateUpdated] = useState()

    const loadUsers = async (e) => {
        console.log(limit,page)
        let resp = await axios.get(`http://localhost:8000/api/v1/getAllUser?limit=${limit}&page=${page}`).catch(e => {
            if (e.response.status == 401) {
                updateloginStatus("Unauthorized")
                return
            }
            if (e.response.status == 403) {
                updateloginStatus("Unathorized access,Only Admin is permitted")
                return
            }
        })
        if (resp.data != null) {
            console.log(resp.data.data)
            updateList(resp.data.data)
            console.log(resp.data.data)
            updateListLength(resp.data.length)
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
        loadUsers();
    }, [limit, page])

    useEffect(() => {
        getOptionsForLimitOfPage()
    }, [UserList])

    const handleLimitChange = (e, limit) => {
        const Limit = limit * 1
        updateLimit(Limit)
    }

    const handlePageChange = (e, pageno) => {
        console.log(pageno)
        const Page = pageno * 1
        updatePage(Page)
    }

    window.onclick = (e) => {
        e.preventDefault()
        updateStatus("normal-message")
        updateMessage("")
    }
    let NumberOfUserPerTable
    if(OptionForLimit){
        NumberOfUserPerTable = Object.values(OptionForLimit).map((option)=>{
            return(
                <option value={option}>{option}</option>
            )
        })
    }

    let TableOfUsers
    if (UserList != []) {
        TableOfUsers = Object.values(UserList).map((user) => {
           return(  
            <User user={user}
            message={[message, updateMessage]}
            status ={[status, updateStatus]}/>
           )
        })
    }

    return (
        <>
            <div className='table'>
                <div className={status}>{message}</div>
                <table className='user-table'>
                    <thead className="table-head">
                        <tr>
                            <td>first name</td>
                            <td>last name</td>
                            <td>role</td>
                            <td>status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {TableOfUsers}
                    </tbody>
                    <tfoot>
                        
                        <label>No of User</label>            
                        <select  onChange={(e) => handleLimitChange(e, e.target.value)}>
                        {NumberOfUserPerTable}
                        </select>
                        <Pagination count={Math.ceil(listLength / limit)} onChange={(e, page) => handlePageChange(e, page)} />
                    </tfoot>

                </table>
            </div>
        </>
    )
}
export default UsersList