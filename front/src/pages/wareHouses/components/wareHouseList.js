import React ,{useState , useEffect} from 'react';
import WareHouse from './wareHouse';
import "./style/wareHouse.css"
import "../components/style/wareHouseList.css";
import "./style/wareHouseList.css";
import {WarehousesData} from "../../../core/data"
import { Link } from 'react-router-dom';
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';


const WareHouseList = () => {
  const [warehouses , setWarehouses ] = useState({
    loading :true,
    result : [],
    err : null,
    reload : 0
  })
  
  useEffect(()=>{
    setWarehouses({...warehouses,loading:true})
    axios
      .get("http://localhost:4000/warehouses")
      .then((resp) => {
        setWarehouses({ ...warehouses, result : resp.data , loading:false});
        console.log(resp);
    })
    .catch((err)=>{
      console.log("false");
      setWarehouses({...warehouses,loading:false , err:"some thing went wrong ,please try again later"});
  });
  },[warehouses.reload]);


  const auth = getAuthUser();
   const deleteWarehouse = (id) =>{
     axios
     .delete("http://localhost:4000/warehouses/" + id ,
     {
       // headers:{
       //  token : auth[0].token,
       // }
     } 
     )
     .then((resp) => {
       setWarehouses({ ...warehouses, reload:warehouses.reload + 1 });
       console.log(resp);
   })
   .catch((err)=>{
     console.log("false");
     setWarehouses({...warehouses , loading:false , err:"some thing went wrong ,please try again later"});
 });  
 }

  return (
    
    <div >
      <div style={{display:"flex"}}>
      <h1 style={{padding:"10px 100px" ,border:"solid 1px black" ,borderRadius:"10px",width:"500px" ,marginLeft:"200px",backgroundColor:"#e4e4e4"}}>All Warehouses</h1>
       <button style={{
        padding:"10px" , height:"45px" ,textAlign:"center",borderRadius:"5px" ,marginLeft:"220px" , marginTop:"35px"
       }} className='new-btn'><Link to={'/addWarehouse'}>Add New Warehouse</Link></button>
      </div>
     <div className='warehouseList'>
     {warehouses.result.map((warehouse)=>
      {
        let state = "";
        if(warehouse.status===1)
        {
          state="active";
        }
        else if(warehouse.status===0)
        {
          state="in-active";
        }
        return (

          // <div className='ware-card'>
          // <WareHouse  key={warehouse.id} name={warehouse.name} descirption={warehouse.descirption} id={warehouse.id} nameOfSupervisor={warehouse.supervisorId}
          // state={warehouse.status} location={warehouse.location}  />
          // </div>

          <div className='ware'>
          <h1 className='t1'> {warehouse.name} </h1>
         <div className='text'>
   
         <h3>Email of Supervisor : <span style={{color:" rgb(22, 70, 94)"}}>{warehouse.email}</span></h3>
         <h3 className='status'>Status : <span style={{color:" rgb(22, 70, 94)"}}>{state}</span></h3>
         <h3 className='location'>Location : <span style={{color:" rgb(22, 70, 94)"}}>{warehouse.location}</span></h3>
         </div>
         <div >
         </div>
         <div className="buttons">
         <button className='btn1'><Link to={'/allProductsOfWarehouse/' + warehouse.id }>All Products</Link></button>
           <button className='btn-d2'><Link to={"/updateWarehouse/"+warehouse.id}> Update </Link></button>
           <button className='btn-d3' onClick={(e)=>{deleteWarehouse(warehouse.id)}}>Delete</button>
         </div>
         
       </div>
        
        
        );
      })}
      
     </div>
     {/* <div className='newWare'><h3 className='t-newWare'>Add New Warehouse</h3>
     
      </div> */}
    </div>
  );
}

export default WareHouseList;


