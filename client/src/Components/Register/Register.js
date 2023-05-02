import React, {useState, useEffect} from "react";
import Title from "../Title/Title";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import validator from "validator"
import "../Login/authentication.css";

function Register(){
    const [message, setMessage]=useState("")
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

        if (!input.username || !input.name || !input.password){
            setMessage("Please enter all details")
        }
        else if(!validator.isEmail(input.username)){
            setMessage("Please enter a valid email")
        }
        else{
            axios.post("/register", newUser
            ).then((response)=>{
                setMessage(response.data.message)
            });
        }
        document.body.style.cursor='default';
    }

    useEffect(()=>{ 
            axios.get("/confirmlogin", {params:{
                token:Cookies.get("token"),
                username:Cookies.get("email")
            }}
            ).then((response)=>{
                history.push("/profile")
            }).catch((error)=>{
            }); 
    }, []);

    return <div class="reg">
    <Title />
    <form class="register-form">
    <div><input type="email" placeholder="email address" name="username" class="reg-input" onChange={handleChange} value={input.username} required></input></div>
    <div><input type="text" placeholder="Name" name="name" class="reg-input" onChange={handleChange} value={input.name} required></input></div>
    <div><input type="password" placeholder="password" name="password" class="reg-input" onChange={handleChange} value={input.password} required></input></div>
    <div><button type="submit" class="reg-button" onClick={handleClick}>REGISTER</button></div>
    <div><Link to="/">ALREADY REGISTERED? LOGIN INSTEAD?</Link></div>
    <div className="message">{message}</div>
    </form>
    </div>;
}

export default Register;