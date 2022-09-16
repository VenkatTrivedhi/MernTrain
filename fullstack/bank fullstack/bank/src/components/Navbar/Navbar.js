import "./Navbar.css";
import image from "../../images/pngwing.com.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";


const Navbar = ({ updatebodyComponent, components, username, role, LogOutButton,Image}) => {

    const Navigate = useNavigate()
    const [isLogin, updateIsLogin] = useState(true)


    const hadleComponentChange = (e, component) => {
        e.preventDefault()
        updatebodyComponent(component)
    }

    let navLinks;

    if (components) {
        navLinks = Object.values(components).map(component => {
            console.log(component)
            return (
                <li>
                    <button onClick={(e) => hadleComponentChange(e, component)}>{component}</button>
                </li>)
        }
        )
    }

    let LogOut

    if (LogOutButton) {
        LogOut = LogOutButton
    }

    return (
        <div className="Nav">
            <img src={image}></img>

            <ul className="nav-links">
                {navLinks}
            </ul>

            <LogOutButton />


            <div id="user">
                <div className="user-details">
                    <h5>{username}</h5>
                    <h1>{role}</h1>
                </div>

                {username ?
                    <div className="avatar">
                        <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }}
                            src={image} 
                            onClick={() => updatebodyComponent("profile-picture")} />
                    </div> :
                    <></>}

            </div>
        </div>
    )
}

export default Navbar