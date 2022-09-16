import "./transaction.css"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Modal, Pagination } from "@mui/material";
import validator from 'validator';
import SpanningTable from "../muiTable/muiTable";
import { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Button from '@mui/material/Button';



function Transaction() {

    const tableRef = useRef(null);


    const [TransactionList, updateTransactionList] = useState([])
    const [listLength, updateListLength] = useState(0)

    let Navigate = useNavigate()

    const [limit, updateLimit] = useState(3)
    const [page, updatePage] = useState(1)
    const [loginStatus, updateloginStatus] = useState("")
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")
    const [loggedInUser,updateLoggedInUser] = useState("loading")
    const [balance,updateBalance] = useState()


    const paramsUsername = useParams().username

    const getLoggedInUser = async() =>{
        const resp = await axios.get("http://localhost:8000/api/v1/loggedInUser").catch((error)=>{
          return error;
        })
        if(resp.response){
            return
        }
        updateLoggedInUser(resp.data.data)  
          
      }

    const getBalance = async() =>{

        const resp = await axios.get(`http://localhost:8000/api/v1/getBalance/${paramsUsername}`).catch((error)=>{
          return error;
        })
        if(resp.response){
            return
        }
        updateBalance(resp.data.data)
        return      
          
      }

    const loadTransactions = async () => {

        let resp = await axios.get(`http://localhost:8000/api/v1/getAllTransactions/${paramsUsername}/?limit=${limit}&page=${page}`).catch(err => {
            if (err.response.status == 401) {
                updateloginStatus("Unauthorized")
                return err
            }
            if (err.response.status == 403) {
                updateloginStatus("Unauthorized access,cannot get transactions of others")
                return err
            }
        })
        if (resp.response) {
            return
        }
        if (resp.data != null) {
            updateTransactionList(resp.data.data)
            updateListLength(resp.data.length)
        }
    }

    const [OptionForLimit, updateOptionForLimit] = useState()
    const getOptionsForLimitOfPage = async () => {
        const resp = await axios.get("http://localhost:8000/api/v1/limitOfPage").catch((error) => {
            console.log(error)
            return
        })
        if (!resp) {
            return
        }
        if (resp.status == 200) {
            updateOptionForLimit(resp.data.data)
        }
    }

    useEffect(() => {
        loadTransactions();
        getBalance();
    }, [limit, page])

    useEffect(() => {
        getOptionsForLimitOfPage();
        getLoggedInUser();
    }, [])

    const handleLimitChange = (limitgiven) => {
        console.log(limitgiven)
        const Limit = parseInt(limitgiven)
        updateLimit(Limit)
    }

    const handlePageChange = (e, page) => {
        console.log(page)
        const Page = parseInt(page)
        updatePage(Page)
    }

    window.onclick = (e) => {
        updateStatus("normal-message")
        updateMessage("")
    }



    if (loginStatus == "Unauthorized") {
        Navigate(`/`, { replace: true })
        return
    }

    let NumberOfContactsPerPage
    if (OptionForLimit) {
        NumberOfContactsPerPage = Object.values(OptionForLimit).map((option) => {
            return (
                <option value={option}>{option}</option>
            )
        })
    }
    console.log(balance)
    return (
        <>

            <div className='table'>
                <div className={status}>{message}</div>
                <table  className='user-table'>
                    
                    <tbody ref={tableRef} >
                        <SpanningTable transactions={TransactionList}
                        balance = {balance} />
                    </tbody>
                    <tfoot className="pagination">
                        <label>No. of transaction</label>

                        <select onChange={(e) => handleLimitChange(e.target.value)} >
                            {NumberOfContactsPerPage}
                        </select>

                        <Pagination count={Math.ceil(listLength / limit)} onChange={(e, page) => handlePageChange(e, page)} />
                    
                    </tfoot>

                    <DownloadTableExcel
                    filename="transacction table"
                    sheet="transaction"
                    currentTableRef={tableRef.current}
                >

                    <Button variant="outlined" color="error"> Export excel </Button>

                </DownloadTableExcel>
                    
                </table>
                
            </div>

        </>
    )

}

export default Transaction;
