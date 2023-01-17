import React from "react";
import axios from "axios";
import "../../Home/Item/item.css";

function Useritem(props){

    async function remove(event){
        event.preventDefault();
        const postToBeDeleted={
            username:props.email,
            _id:props._id, 
            image:props.image
        }
        
        //props.onRemove(props.id);
        await axios.post("/deletepost", postToBeDeleted
        ).then((response)=>{
            props.setUserPosts(response?.data?.foundPosts)
        });
    }

    return <div class="item">
    <div class="s"></div>
    <div class="img-div"><img src={"https://secondhandsellit.s3.ap-south-1.amazonaws.com/"+props.image} alt="none" class="img-class"></img></div>
    <div>Item:-{props.item}</div>
    <div>Name:-{props.name}</div>
    <div>Phone number:-{props.number}</div>
    <div>Email:-{props.email}</div>
    <div>Address:-{props.address}</div>
    <div>Locality:-{props.locality}</div>
    <div>City:-{props.city}</div>
    <div>Time:-{props.time}</div>
    <div><form action="/delete" method="POST" class="entry-delete">
    <button name={props.email} class="entry-delete" onClick={remove}>Delete</button>
    </form></div>
    </div>;
}

export default Useritem;