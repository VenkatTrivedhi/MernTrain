import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState} from "react";
import validator from 'validator';
import Button from '@mui/material/Button';

function Withdraw() {
    const [message, updateMessage] = useState("")
    const [status, updateStatus] = useState("normal-message")
    const [amount,updateAmount] =  useState()
    const paramsUsername = useParams().username


    const changeAmount=(amountGiven)=>{
        updateAmount(amountGiven)
        if(!validator.isNumeric(amountGiven.toString())){
            updateMessage("only numbers are allowed")
            updateStatus("fail")
        }
        else{
            updateMessage("nice,this input is avalid")
            updateStatus("success")
        }        
    }

    const handleWithdraw = async () => {
        updateMessage("")
        updateStatus("normal-message")

        
        if(!validator.isNumeric(amount.toString())){
            updateMessage("only numbers are allowed")
            updateStatus("fail")
            return
        }

        console.log("withdrwsss")

        const resp = await axios.post(`http://localhost:8000/api/v1/withdraw/${paramsUsername}`, {amount}).catch((error) => {
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

        if (resp.status == 200) {
            updateMessage(resp.data.message)
            updateStatus("success")
            return
        }
        updateMessage("something went wrong")
    }


    return(
        <>
        <div className="form-container">
            <form >
                <h1>withdraw</h1>

                <input type="text" placeholder='amount' value={amount}
                    onChange={(e) => changeAmount(e.target.value)}>
                </input> <br></br>

                <Button size='small' type='submit' onClick={() => handleWithdraw()}>withdraw</Button> <br></br>
                <label className={status}>{message}</label>
            </form>
        </div>
    </>
    )
}

export default Withdraw;
