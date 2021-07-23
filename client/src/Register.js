import React, {useState} from "react";
import Title from "./Title";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import "./authentication.css";

function Register(){
    const history=useHistory();
    const[input, setInput]=useState({
        username:"",
        name:"",
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
        const newUser={
            username:input.username,
            name:input.name,
            password:input.password
        };

        axios.post("/register", newUser
        ).then((response)=>{
            history.push("/");
        });
        document.body.style.cursor='default';
    }

    return <div class="reg">
    <Title />
    <form class="register-form">
    <div><input type="email" placeholder="email address" name="username" class="reg-input" onChange={handleChange} value={input.username} required></input></div>
    <div><input type="text" placeholder="Name" name="name" class="reg-input" onChange={handleChange} value={input.name} required></input></div>
    <div><input type="password" placeholder="password" name="password" class="reg-input" onChange={handleChange} value={input.password} required></input></div>
    <div><button type="submit" class="reg-button" onClick={handleClick}>REGISTER</button></div>
    <div><Link to="/">ALREADY REGISTERED? LOGIN INSTEAD?</Link></div>
    </form>
    </div>;
}

export default Register;