import React, { useState , useRef } from 'react';
import "../components/style/addProduct.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../../../helper.js/Storage';
import "../../login/components/alert.css";
const AddProduct = () => {
  var {id} = useParams();
  const [product , setProduct ] = useState({
    name :"",
    descirption :"",
    stock:'',
    warehouseId:"",
    loading :false,
    err : "",
    successMessage :null
  });

const image = useRef(null)
const auth = getAuthUser();
const createProduct = (e) => {
  e.preventDefault();
   
  setProduct({...product , loading: true});
  const formData = new FormData();
   formData.append("name",product.name);
   formData.append("discription",product.descirption);
   formData.append("stock",product.stock);
   formData.append("warehouseId",id);
   if (image.current.files && image.current.files[0]) {
    formData.append("photo" , image.current.files[0]);
   }

  axios
  .post("http://localhost:4000/products//add-product/"+id,formData ,
  {
     headers:{
     //   token : auth[0].token,
        "Content-Type" : "multipart/form-data",
       },
  }).then((resp) => {
    setProduct({
    name:"",
    descirption :"",
    stock:'',
    warehouseId:"",
    loading :false,
    successMessage:"Product created successfully !"
    });
    image.current.value = null;
  }
  )
  .catch((err) => {
    setProduct({
      name:"",
      descirption :'',
      stock:'',
      err:[],
      loading :false,
      err:"Some thing went Wrong !"
    });
  });
};

  return (
    <div>
       <div>
        {
          product.err && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert error">
              <span class="alertClose">X</span>
              <span class="alertText">{product.err}
              <br class="clear"/></span>
            </div>
            </label>
          )
        } 

        {
          product.successMessage && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert success">
              <span class="alertClose">X</span>
              <span class="alertText">{product.successMessage}
              <br class="clear"/></span>
            </div>
          </label>
          )
        } 


       <div className='form-container3'>
         <h1 className='t-product' style={{}}>Add New Product</h1>
         <div className='form-new3'>
             <form onSubmit={createProduct}>
        
                 <label className='l3'>Name</label>
                 <input required  type='text' value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} placeholder='Enter name of Product'/>
                 
 
 
                 <label className='l3' htmlFor='supervisor'>Stock</label>
                 <input required type='supervisor' value={product.stock} onChange={(e)=>setProduct({...product,stock:e.target.value})}   placeholder='Enter stoke of Product' />
                
 
                 
                 <label className='l3' htmlFor='location'>Description</label>
                 <input  required type='text' value={product.descirption} onChange={(e)=>setProduct({...product,descirption:e.target.value})}  placeholder='Enter The Description' rows={500}/>
                 {/* <textarea rows={5}  /> */}

                 <label className='l3' htmlFor='status'>Image <input className='imagefiled' ref={image} type='file'/> </label>


                 <button className='add-btn3'>Add</button>
             </form>
         </div>
        
       </div>
     </div>
    </div>
  );
}

export default AddProduct;
