import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import validator from 'validator';
import Button from '@mui/material/Button';
import { Autocomplete } from "@mui/material";


function Tranfer() {
    const [usernameOptions, updateUsernameOptions] = useState([])
    const [loginStatus, updateloginStatus] = useState()
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")
    const [amount, updateAmount] = useState()
    const [creditUsername, updateCreditUsername] = useState()
    const paramsUsername = useParams().username

    const getALLUsernames = async () => {

        if (usernameOptions.length != 0) {
            return
        }

        let resp = await axios.get(`http://localhost:8000/api/v1/getAllUsernames/${paramsUsername}`).catch((err) => {
            return err
        })
        if (resp.response) {
            if (resp.response.status == 401) {
                updateloginStatus("Unauthenticated")
                return resp
            }
            if (resp.response.status == 403) {
                updateloginStatus("Unauthorized")
                return resp
            }
        }
        if (resp.data != null) {
            let options =[]
            Object.values(resp.data.data).map(item =>{
                if(item.username!=paramsUsername){
                    options.push(item.username)
                }})
            console.log(options)
            updateUsernameOptions(options)
        }
    }

    useEffect(() => { getALLUsernames(); }, [])

    const changeAmount = (amountGiven) => {
        updateAmount(amountGiven)
        if (!validator.isNumeric(amountGiven.toString())) {
            updateMessage("only numbers are allowed")
            updateStatus("fail")
        }
        else {
            updateMessage("nice,this input is avalid")
            updateStatus("success")
        }
    }

    const changeCreditUser = (username) => {
        updateCreditUsername(username)
    }

    const handleTransfer = async () => {
        updateMessage("")
        updateStatus("normal-message")


        if (!validator.isNumeric(amount.toString())) {
            updateMessage("only numbers are allowed")
            updateStatus("fail")
            return
        }
        
        if(!creditUsername){
            updateMessage("select user user to be recieved")
            updateStatus("fail")
            return
        }

        if(creditUsername==""){
            updateMessage("select user to be recieved")
            updateStatus("fail")
            return
        }

        console.log("withdrwsss")

        const resp = await axios.post(`http://localhost:8000/api/v1/transfer/${paramsUsername}`, { amount, creditUsername }).catch((error) => {
            return error
        })

        if (resp.response) {
            updateMessage(resp.response.data.message)
            updateStatus("fail")
            return
        }

        if (resp.status == 201) {
            updateMessage(resp.data.message)
            updateStatus("success")
            return
        }
        updateMessage("something went wrong")

    }

    if (loginStatus === "Unauthorized") {
        return (
            <div className="form-container">
                sorry , your are not permitted here
            </div>
        )
    }

    if (loginStatus === "Unauthenticated") {
        return (
            <div className="form-container">
                <a href='/'>Please Relogin</a>
            </div>
        )
    }

    return (
        <>
            <div className="form-container">
                <form >
                    <h1>Transfer</h1>

                    <input type="text" placeholder='amount' value={amount}
                        onChange={(e) => changeAmount(e.target.value)}>
                    </input> <br></br>

                    <Autocomplete
                        sx={{
                            display: 'inline-block',
                            '& input': {
                              
                                bgcolor: 'background.paper',
                                color: (theme) =>
                                    theme.palette.getContrastText(theme.palette.background.paper),
                            },
                        }}
                        id="custom-input-demo"
                        options={usernameOptions}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                                <input type="text"  {...params.inputProps}  placeholder='transfer to'
                                onSelect={(e)=>changeCreditUser(e.target.value)}>
                                </input> <br></br>
                            </div>
                        )}
                    /><br></br>

                    <Button size='small' onClick={() => handleTransfer()}>transfer</Button> <br></br>
                    <label className={status}>{message}</label>
                </form>
            </div>
        </>
    )
}


export default Tranfer;
