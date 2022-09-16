import './profilePicture.css';
import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';


function ProfilePicture(props) {
    const [image, updateImage] = props.picture
    const [message,updateMessage] = useState()
    const [status,updateStatus] = useState()
    
    const handleImageChange = async (e) =>{
        const fd = new FormData()
        fd.append('image',e.target.files[0])
        const resp = await axios.post(`http://localhost:8000/api/v1/uploadProfilePicture`,fd).catch(err=>{
            return err
        })
        if(resp.response){
            updateMessage("image could not be updated")
            updateStatus("fail")
            return 
        }
        if(resp.status==200){
            updateImage(resp.data.data)
            updateMessage(resp.data.message)
            updateStatus("success")
        }
    }

    return (
        <>
            <div className="profile-picture">
            <img src={image} />
              <form  encType="multipart/form-data">
              <Button style={{ backgroundColor: "transparent" }} variant="contained" component="label">
                    <Edit />
                    <input type="file" hidden onChange={(e)=>handleImageChange(e)}/>
                </Button>
              </form>
              <label class="fail">{message}</label>

                
            </div>

        </>
    )
}

export default ProfilePicture