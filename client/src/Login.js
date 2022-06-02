import React, {useState} from "react";
import Title from "./Title";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./authentication.css";

function Login(props){
    const history=useHistory();
    const [message, setMessage]=useState("")
    const[input, setInput]=useState({
        username:"",
        password:""
    })


    function handleChange(event){
        const{name, value}=event.target;
        setInput(prevValue=>{
            return{
                ...prevValue,
                [name]:value
            }
        })
    }

    function handleClick(event){ 
        document.body.style.cursor='wait';
        event.preventDefault();
        const user={
            username:input.username,
            password:input.password
        };
        
        axios.post("/login", user
        ).then((response) => {
            if(response.data.auth){
                Cookies.set("email", response.data.email);
                Cookies.set("name", response.data.name);
                Cookies.set("token", response.data.token);
                history.push("/profile");
            }
            else {
                setMessage(response.data.message)
            }
        }); 
        document.body.style.cursor='default';
    }

    return <div>
    <Title />
    <form action="/login" class="register-form" method="POST">
    <div>YOU CAN'T LOGIN IF YOU ARE NOT A REGISTERED USER</div>
    <div><input type="email" placeholder="email address" name="username" class="reg-input" onChange={handleChange} value={input.username} required></input></div>
    <div><input type="password" placeholder="password" name="password" class="reg-input" onChange={handleChange} value={input.password} required></input></div>
    <div><button type="submit" class="reg-button" onClick={handleClick}>LOGIN</button></div>
    <div><Link to="/register">NOT REGISTERED? REGISTER INSTEAD?</Link></div>
    <div className="message">{message}</div>
    </form> 
    </div>;
}

export default Login;