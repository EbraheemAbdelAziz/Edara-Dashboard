import React, { useEffect, useState } from 'react';
import "./style/wareHouse.css"
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../../helper.js/Storage';
import axios from 'axios';
import {deleteWarehoue} from "./wareHouseList"


const WareHouse = (props) => {
  return (
   <></>
  );
}

export default WareHouse;












    // const [warehouses , setWarehouses ] = useState({
    //   loading :true,
    //   result : [],
    //   err : null,
    //   reload : 0
    // })
    
    // useEffect(()=>{
    //   setWarehouses({...warehouses,loading:true})
    //   axios
    //     .get("http://localhost:4000/warehouses")
    //     .then((resp) => {
    //       setWarehouses({ ...warehouses, result : resp.data , loading:false});
    //       console.log(resp);
    //   })
    //   .catch((err)=>{
    //     console.log("false");
    //     setWarehouses({...warehouses,loading:false , err:"some thing went wrong ,please try again later"});
    // });
    // },[warehouses.reload]);
  