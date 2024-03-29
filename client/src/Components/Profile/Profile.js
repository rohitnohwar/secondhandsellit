import React, {useState, useEffect} from "react";
import Nav from "../Nav/Nav";
import Useritem from "./Useritem/Useritem";
import Title from "../Title/Title";
import Entry from "./Entry/Entry";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import "./profile.css";

function Profile(props){  
    const history=useHistory();

    const [user, setUser]=useState({
        email: Cookies.get("email"),
        name: Cookies.get("name"),
        token: Cookies.get("token")
    });

    const [auth, setAuth]=useState(Cookies.get("token"));

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
            setUserPosts={setUserPosts}
            //onRemove={handleRemove}
            />);
    }

    function logout(event){
        event.preventDefault();
        Cookies.remove("email");
        Cookies.remove("name");
        Cookies.remove("token");
        setAuth("");
    }

    async function handleAdd(event){
        await axios.post("/userposts", {username:user.email, token:Cookies.get("token")}
        ).then((response)=>{
            setUserPosts(response.data.foundPosts);
        })
        .catch((error)=>{
        });
    }

    /*function handleRemove(id){
        setUserPosts(prevUserPosts=>{
            return prevUserPosts.filter((userPost, index)=>{
                return id!==index;
            })
        })
    }*/

    useEffect(()=>{ 
        if(auth){
            axios.get("/userposts", {params:{
                username:user.email,
                token:Cookies.get("token")
            }}
            ).then((response)=>{
                setUserPosts(response.data.foundPosts);
            }); 
        }
    }, []);

    useEffect(()=>{ 
        if(auth){
            axios.get("/confirmlogin", {params:{
                token:Cookies.get("token"),
                username:user.email,
            }}
            ).then((response)=>{
                
            }).catch((error)=>{
                history.push("/")
            }); 
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