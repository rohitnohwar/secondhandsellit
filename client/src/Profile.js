import React, {useState, useEffect} from "react";
import Nav from "./Nav";
import Useritem from "./Useritem";
import Title from "./Title";
import Entry from "./Entry";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Cookies from "js-cookie";
import "./profile.css";

function Profile(props){  
     
    const [user, setUser]=useState({
        email: Cookies.get("email"),
        name: Cookies.get("name")
    });

    const [auth, setAuth]=useState(Cookies.get("email"));

    const [userPosts, setUserPosts]=useState([]);

    function createcard(items, index){
        return (<Useritem 
            key={index}
            id={index}
            item={items.item}
            name={items.name}
            number={items.number}
            email={items.email}
            address={items.address}
            locality={items.locality}
            city={items.city}
            time={items.time}
            _id={items._id}
            image={items.image}
            onRemove={handleRemove}
            />);
    }

    function logout(event){
        event.preventDefault();
        Cookies.remove("email");
        Cookies.remove("name");
        setAuth("");
    }

    function handleAdd(event){
        axios.post("/userposts", {username:user.email}
        ).then((response)=>{
            setUserPosts(response.data.foundPosts);
        });
    }

    function handleRemove(id){
        setUserPosts(prevUserPosts=>{
            return prevUserPosts.filter((userPost, index)=>{
                return id!==index;
            })
        })
    }

    useEffect(()=>{ 
        if(auth){
            document.body.style.cursor='wait';
            axios.get("/userposts", {params:{
                username:user.email
            }}
            ).then((response)=>{
                setUserPosts(response.data.foundPosts);
            });
            document.body.style.cursor='default';  
        }
    }, []);

    if(auth){
        return <div>
        <Title />
        <div class="sticky"><Nav /></div>
        <div class="pro"><span class="profile">{user.name}</span></div>
        <form class="pro" action="/logout" method="POST"><button type="submit" class="logout-button" onClick={logout}>LOGOUT</button></form>
        <Entry 
        email={user.email}
        name={user.name}
        onAdd={handleAdd}
        />
        <div class="user-posts">YOUR POSTS</div>
        <div class="posts">{userPosts.map(createcard)}</div>
        </div>
    }

    else{
        return <Redirect to="/" />
    }
}

export default Profile;