import React, {useState} from "react";
import axios from "axios";
import "./entry.css";

function Entry(props){

    const [entry, setEntry]=useState
    ({
        item:"",
        number:"",
        address:"",
        locality:"",
        city:""
    });

    const [uploadImage, setUploadImage]=useState();

    function handleChange(event){
        const {name, value}=event.target;
        setEntry(prevValue=>{
            return{
                ...prevValue,
                [name]:value
            }
        });
    }

    function handleFileChange(event){
        const file=event.target.files[0];
        setUploadImage(file);
    }

    function handleClick(event){
        document.body.style.cursor='wait';
        event.preventDefault();
        const formdata=new FormData();
        formdata.append("image", uploadImage);
        formdata.append("item", entry.item);
        formdata.append("name", props.name);
        formdata.append("number", entry.number);
        formdata.append("email", props.email);
        formdata.append("address", entry.address);
        formdata.append("locality", entry.locality);
        formdata.append("city", entry.city);

        axios.post("/entry", formdata
        ).then((response)=>{
            props.onAdd();
        });

        setEntry({
            item:"",
            number:"",
            address:"",
            locality:"",
            city:""
        });

        document.getElementById("entry-input-image").value = "";
        setUploadImage(null);
        document.body.style.cursor='default';
    }

    return <div class="entry">
    <form action="/entry" method="POST" enctype="multipart/form-data">
    <div class="entry-header">All Fields are compulsory</div>
    <div>Choose an image</div>
    <div class="entry-div"><input type="file" name="image" id="entry-input-image" onChange={handleFileChange} required></input><div class="uploaded-image"></div></div>
    <div class="entry-div"><input type="text" name="item" placeholder="Item" class="entry-input" onChange={handleChange} value={entry.item} required></input></div>
    <div class="entry-div"><input type="text" name="number" placeholder="Phone number" class="entry-input" onChange={handleChange} value={entry.number} required></input></div>
    <div class="entry-div"><input type="text" name="address" placeholder="Address" class="entry-input" onChange={handleChange} value={entry.address} required></input></div>
    <div class="entry-div"><input type="text" name="locality" placeholder="Locality" class="entry-input" onChange={handleChange} value={entry.locality} required></input></div>
    <div class="entry-div"><input type="text" name="city" placeholder="City" class="entry-input" onChange={handleChange} value={entry.city} required></input></div>
    <div class="entry-button-div"><button type="reset" class="entry-button" onClick={handleClick} >ENTER</button></div>
    </form>
    </div>;
} 

export default Entry;