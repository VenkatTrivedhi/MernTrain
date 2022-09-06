import "./Navbar.css";
import image from "../../images/contact group.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = ({ updatebodyComponent, components, username, role, LogOutButton }) => {

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
            <img src={image} />
            <div id="user">
                <h5>{username}</h5>
                <h1>{role}</h1>
            </div>
            <ul className="nav-links">
                {navLinks}
            </ul>
            <LogOutButton  />
        </div>
    )
}

export default Navbar