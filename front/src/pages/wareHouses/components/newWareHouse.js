import React, { useState ,useEffect} from 'react';
import "../components/style/newWareHouse.css"
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import "../../login/components/alert.css";
const NewWareHouse = () => {
 
  const [warehouse , setWarehouse ] = useState({
    name :"",
    location :"",
    supervisor:'',
    
    loading :false,
    err : "",
    successMessage :"",
  });
 const auth = getAuthUser();
  const createWareHouse = (e) => {
  e.preventDefault();
  setWarehouse({...warehouse , loading: true});
  axios
  .post("http://localhost:4000/warehouses/add-warehouse",{
    name:warehouse.name,
    location:warehouse.location,
    supervisorId:warehouse.supervisor,
    status:warehouse.status
  },
  {
     headers:{
        token : auth[0].token,
       },
  }).then((resp) => {
    setWarehouse({
    name :"",
    location :"",
    supervisor:'',
    status:'',
    err:"",
    successMessage:"Warehouse created successfully !"
    });
  }
  )
  .catch((err) => {
    setWarehouse({
    name :"",
    location :"",
    supervisor:'',
    status:'',
    err:"Please Choose a vailed(free) supervisor!"
    });
  });
};

const [supervsors , setsupervsors ] = useState({
  loading :true,
  result : [],
  err : null,
  reload : 0
})
useEffect(()=>{
  setsupervsors({...supervsors,loading:true})
  axios
    .get("http://localhost:4000/supervisors",
    {
      headers:{
       token : auth[0].token,
      }
    })
    .then((resp) => {
      
      setsupervsors({ ...supervsors, result : resp.data , loading:false});
      
      
  })
  .catch((err)=>{
    console.log("false");
    setsupervsors({...supervsors,loading:false , err:"some thing went wrong ,please try again later"});
});
},[supervsors.reload]);




   return (
     <div >
        {
          warehouse.err && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert error">
              <span class="alertClose">X</span>
              <span class="alertText">{warehouse.err}
              <br class="clear"/></span>
            </div>
            </label>
          )
        } 

        {
          warehouse.successMessage && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert success">
              <span class="alertClose">X</span>
              <span class="alertText">{warehouse.successMessage}
              <br class="clear"/></span>
            </div>
          </label>
          
          )
        } 

       <div className='form-container'>
         <h1 className='newWare-t'>Add New Warehouse</h1>
         <div className='form-new'>
             <form onSubmit={createWareHouse}>
                 <label className='l'>Name</label>
                 <input required  type='text' placeholder='Enter The Name' value={warehouse.name} onChange={(e)=>setWarehouse({...warehouse , name :e.target.value})}/>
 
 
                 <label className='l' htmlFor='supervisor'>Supervisior Email</label>

                 <select className='select'onChange={(e)=>setWarehouse({...warehouse , supervisor:e.target.value})}>
                 <option  value={""} ></option>
                  {
                    supervsors.result.map((supervisor)=>{
                     return(
                      <option defaultValue={""} value={supervisor.id} >{supervisor.email}</option>
                     );
                    })
                  }
                  </  select>
                 {/* <input required type='supervisor' placeholder='Enter   [ ID ]  of Supervisor ' 
                 value={warehouse.supervisor} onChange={(e)=>setWarehouse({...warehouse , supervisor :e.target.value})} /> */}
 
                 
                 <label className='l' htmlFor='location'>Location</label>
                 <input  required type='location' placeholder='Enter The Location' 
                 value={warehouse.location} onChange={(e)=>setWarehouse({...warehouse , location :e.target.value})}/>
 
                 
                 {/* <label className='l' htmlFor='status'>Status</label>
                 <input placeholder='Enter The Status (0 or 1)' type='status'
                 value={warehouse.status} onChange={(e)=>setWarehouse({...warehouse , status :e.target.value})}/> */}
                 <button className='add-btn'>Add</button>
             </form>
         </div>
        
       </div>
     </div>
   );
}

export default NewWareHouse;

