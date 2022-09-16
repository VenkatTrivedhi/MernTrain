import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { AutoAwesome } from "@mui/icons-material";


function LogoutButton() {
    const Navigate = useNavigate()
    const logOutUrl = `http://localhost:8000/api/v1/logout`

    const logOut = async (e, url) => {
        e.preventDefault()
        const resp = await axios.post(url).catch((e) => console.log(e))
        if (resp.status == 200) {
            console.log("logout")
            Navigate("/", { replace: true })
        }
    }

    return (
        <Button className="logout_button"
        
         variant="outlined"
         sx={{height:40,
            marginTop:5,
            color:"white",
            borderColor:"lightpink"
        }
        }
            onClick={(e) => logOut(e, logOutUrl)} >
            Log out
        </Button>
    )
}

export default LogoutButton