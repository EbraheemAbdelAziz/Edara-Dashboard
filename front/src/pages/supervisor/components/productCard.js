
import "./style/productCard.css";
import React, { useState ,useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {

  return (
    
      <div className='product'>
      <div className="card-top1">
        <img className='img' src={props.image} alt="photo"/>
        </div>
        <div className="card-info">
        <h3 style={{display:"inline"}} className="title">Name: </h3> <h3 style={{display:"inline",color:" rgb(21, 117, 164)"}}> {props.name}</h3><br></br>
        <h3 style={{display:"inline"}}> stock : </h3> <h3 style={{display:"inline",color:" rgb(21, 117, 164)"}} >{props.stock}</h3>
        <div><h3 style={{marginBottom:"0px"}} >Description : </h3> <p className='desProduct'> {props.description}</p></div>
        
       
        
        <button className='bb1' > <Link to={"/sendRequest/"+props.id} name={props.name}  > Request</Link></button>
        </div>
      </div>
  );
 
}

export default ProductCard;
