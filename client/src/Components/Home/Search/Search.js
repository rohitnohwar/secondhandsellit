import React,{useState} from "react";
import {useHistory} from "react-router-dom";
import "./search.css";

function Search(props){
    const history=useHistory();

    const [search, setSearch]=useState("");

    function handleChange(event){
        const{name, value}=event.target;
        setSearch(value);
    }

    function handleClick(event){
        event.preventDefault();
        let str=search.replace(/\s+/g, '-').toLowerCase();
        const searched="/home?"+str;
        history.push(searched);
    }

    return   <div class="search-div form">
    <form action="/search" method="POST">
    Type item, locality or/and city name <input type="text" name="item" placeholder="Search.." class="form-input" onChange={handleChange} value={search}></input>
    <button name="button" class="form-button" onClick={handleClick}>Search</button>
    </form>
    </div>

}

export default Search;