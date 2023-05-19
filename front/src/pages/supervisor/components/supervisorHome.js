import React, { useEffect, useState } from 'react';
import "./style/supervisorHome.css"
import axios from 'axios';
import ProductCard from './productCard';
import { getAuthUser } from '../../../helper.js/Storage';
const SupervisorHome = () => {
  const auth = getAuthUser();
  const [prodcts , setProducts ] =useState ({
    loading :true,
    results:[],
    err:null,
    reload:0
  })
  useEffect(()=>{
    setProducts({...prodcts,loading:true})
    axios.get("http://localhost:4000/superProduct",{
      headers: {
      token: auth[0].token,   
    },
    })
    .then(resp =>{
      console.log(resp);
      setProducts({...prodcts,results:resp.data ,loading:false})
    }).catch(err=>{
      setProducts({...prodcts,loading:false , err:"some thing went wrong"});
  })
  },[])

  return(
   <div>
     {/* <h1 style={{marginBottom:"0px"}}>Your Produts </h1> */}
     <h2 className='span1'>Your Products</h2>
    <div className="products-super"> 
    {
      prodcts.results.map((prodct)=>{
        return(
          <ProductCard id={prodct.id} name={prodct.name}  description={prodct.discription} stock={prodct.stock} wId={prodct.warehouseId} image={prodct.photo} />
        );
      })
    }
      
      

    </div>
   </div>
);

}

export default SupervisorHome;
