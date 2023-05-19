import React, { useState,useRef,useEffect } from 'react';
import { getAuthUser } from '../../../helper.js/Storage';
import { useParams } from 'react-router-dom';
import axios from "axios";
const SendRequest = () => {

  let { id } = useParams();
  const auth = getAuthUser();

  const [product, setProduct] = useState({
      stock:"",
      loading: false,
      reload: false,
      success: null,
  });



  useEffect(() => {
    
    axios
        .get("http://localhost:4000/products/update-product/" +id,{
          headers: {
              token: auth[0].token,
              "Content-Type": "multipart/form-data",
          },
      })
        .then((resp) => {
          console.log(resp);
          setProduct({
            ...product,
                stock:resp.data[0].stock,
            });
        })
        .catch((err) => {
          setProduct({
                ...product,
                loading: false,
                success: null,
                err: "Something went wrong, please try again later !",
            });
        });
     
}, [product.reload]);


const [request ,setRequest] = useState({
  amount:0,
  loading :true,
  err : null,
  reload : 0,
  success:null,
});

const increase=()=>{
  setRequest({...request,amount:request.amount+1});
}
const decrease=()=>{
  setRequest({...request,amount:request.amount-1});
}

const sendRequest = ()=>{
  axios
  .post("http://localhost:4000/supervisor/requests/add-request",{
    amount:request.amount,
    productId:id
  },
  {
    headers:{
     token : auth[0].token,
    }
  } 
  )
  .then((resp) => {
    setRequest({...request,success:"Request is Send"});
    console.log(resp);
    
})
.catch((err)=>{
  setRequest({...request,err:"Request is field"});
  console.log("false");

});  
}

  return (
    <>
    <div>
    <div className='form-container'>
         <h1 className='newWare-t'>Send Request</h1>
         <div className='form-new'>
         {
          request.err && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert error">
              <span class="alertClose">X</span>
              <span class="alertText">{request.err}
              <br class="clear"/></span>
            </div>
            </label>
          )
        } 
        {
          request.success && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert success">
              <span class="alertClose">X</span>
              <span class="alertText">{request.success}
              <br class="clear"/></span>
            </div>
          </label>
          )
        } 
                 {/* <label className='l'>Name</label>
                 <input required  type='text' placeholder='Enter The Name' /> */}
                 {/* {console.log(auth[0].token+"  "+request.amount+"   "+id)} */}
                    <h1 style={{margin:"50px 10px"}}>Your Stock is = {product.stock}</h1>
                    <button style={{marginLeft:"80px"}} class= "btn-d3" onClick={decrease}>Decrease Stock</button>
                    <h1 style={{display:"inline",margin:"0px 45px"}}>{request.amount}</h1>
                    <button class= "btn-d2" onClick={increase}>Increase Stock</button>
                <form onSubmit={sendRequest}> <button style={{marginTop:"90px"}} className='add-btn'>Send</button> </form>
         </div>
       </div>
      </div>
    </>
  );
}

export default SendRequest;
