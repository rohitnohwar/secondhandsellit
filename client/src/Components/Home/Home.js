import React, {useState, useEffect} from "react";
import Nav from "../Nav/Nav";
import Item from "./Item/Item";
import Title from "../Title/Title";
import Search from "./Search/Search";
import {Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./home.css";

function Home(props){
    const history=useHistory();
    const [posts, setPosts]=useState([]);

    const [auth, setAuth]=useState(Cookies.get("token"));

    function createcard(items, index){
        return (<Item 
            image={items.image}
            item={items.item}
            name={items.name}
            number={items.number}
            email={items.email}
            address={items.address}
            locality={items.locality}
            city={items.city}
            time={items.time}
            />);
    }

    useEffect(()=>{
        if(auth){
            document.body.style.cursor='wait';
            let searched=window.location.search;
            if(searched==="" || searched==="?-"){
                axios.get("/posts", {params:{token:Cookies.get("token"), username: Cookies.get("email")}},
                ).then((response)=>{
                    setPosts(response.data.foundPosts);
                })
                .catch((error)=>{
                });
            }
            else{
                let str = searched.replace(/-/g, ' ');
                const search=str.slice(1);
                axios.get("/search", { params:{search:search, token:Cookies.get("token"), username: Cookies.get("email")}}
                ).then((response)=>{
                    setPosts(response.data.foundPosts);
                })
                .catch((error)=>{
                });
            }
            document.body.style.cursor='default';
        }
    },[window.location.search]);

    useEffect(()=>{ 
        if(auth){
            axios.get("/confirmlogin", {params:{
                token:Cookies.get("token"),
                username:Cookies.get("email")
            }}
            ).then((response)=>{
                
            }).catch((error)=>{
                history.push("/")
            }); 
        }
    }, []);

    function handleSearch(foundPosts){
        setPosts(foundPosts);
    }

    if(auth){
        return <div>
        <Title />
        <div class="sticky"><Nav />
        <Search
        onSearch={handleSearch}
        /></div>
        <div class="result">Showing results for "{window.location.search.slice(1).replace(/-/g, ' ')}"</div>
        <div class="posts">{posts.map(createcard)}</div>
        </div>;
    }
    else{
        return <Redirect to="/" />
    }
}

export default Home;