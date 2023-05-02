import React from "react";
import "./item.css";

function Item(props){
    return <div class="item">
    <div class="img-div"><img src={"https://secondhandsellit.s3.ap-south-1.amazonaws.com/"+props.image} alt="none" class="img-class"></img></div>
    <div>Item:-{props.item}</div>
    <div>Name:-{props.name}</div>
    <div>Phone number:-{props.number}</div>
    <div>Email:-{props.email}</div>
    <div>Address:-{props.address}</div>
    <div>Locality:-{props.locality}</div>
    <div>City:-{props.city}</div>
    <div>Time:-{props.time}</div>
    </div>;
}

export default Item;