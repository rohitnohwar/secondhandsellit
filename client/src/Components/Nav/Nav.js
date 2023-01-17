import React from "react";
import {useHistory} from "react-router-dom";
import "./nav.css";

function Nav(){
    const history=useHistory();

    function handleHomeNav(){
        history.push("/home");
    }

    function handleProfileNav(){
        history.push("/profile");
    }

    return <nav class="navi">
    
    <div class="f" onClick={handleHomeNav}>Home</div>

    <div class="f" onClick={handleProfileNav}>Profile</div>

    </nav>;
}

export default Nav;