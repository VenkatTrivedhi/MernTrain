import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton () {
    const Navigate = useNavigate()
    const logOutUrl = `http://localhost:8000/api/v1/logout`
    
    const logOut = async (e,url) => {
        e.preventDefault()
        const resp =await axios.post(url).catch((e)=>console.log(e))
        if(resp.status==200){
            console.log("logout")
            Navigate("/",{replace:true})
        }
    }
    
    return (
        <button className="button" onClick={(e) => logOut(e,logOutUrl)} > Log out</button>
    )
}

export default LogoutButton