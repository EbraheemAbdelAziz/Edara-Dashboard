import React, { useState } from 'react';
import "./style/addSupervisor.css"
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import "../../login/components/alert.css";

const AddSupervisor = () => {
    
    
  const [newSupervisor , setNewSupervisor ] = useState({
    email :"",
    password :"",
    phone:'',
    status:'',
    loading :false,
    err : "",
    successMessage :null
  });
 const auth = getAuthUser();


  const addSupervisor = (e) => {
  e.preventDefault();
   
  setNewSupervisor({...newSupervisor , loading: true});

  axios
  .post("http://localhost:4000/supervisors/add-supervisor",{
    email:newSupervisor.email,
    password:newSupervisor.password,
    phone:newSupervisor.phone,
    status:newSupervisor.status
  },
  {
     headers:{
     //   token : auth[0].token,
       },
  }).then((resp) => {
    setNewSupervisor({
      email :"",
      password :"",
      phone:'',
      status:'',
      loading :false,
      successMessage:"Supervisor added successfully !"
    },
   );
   
  } 
  )
  .catch((err) => {
    setNewSupervisor({
    email :"",
    password :"",
    phone:'',
    status:'',
    loading :false,
    err:"Some thing went Wrong !"
    });
  });
 
};
 
  return (
    <div>
        {
          newSupervisor.err && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert error">
              <span class="alertClose">X</span>
              <span class="alertText">{newSupervisor.err}
              <br class="clear"/></span>
            </div>
            </label>
           // alert(newSupervisor.err)
          )
        } 
        {
          newSupervisor.successMessage && (
            <label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert success">
              <span class="alertClose">X</span>
              <span class="alertText">{newSupervisor.successMessage}
              <br class="clear"/></span>
            </div>
          </label>
           //alert(newSupervisor.successMessage)
          )
        } 
        
        <div className='form-container-super'>
         <h1 className='t-super'>Add New Supervisor</h1>
         <div className='form-new'>
             <form onSubmit={addSupervisor}>
                
                  <div style={{display:"flex" , margin:"10px 10px"}} >
                  <label className='l-super'>Email</label>
                 <input required  type='email' placeholder=' Enter The Email (@.com)'  
                 value={newSupervisor.email} onChange={(e)=>setNewSupervisor({...newSupervisor , email :e.target.value})}/>
                </div>  


                <div style={{display:"flex" , margin:"10px 5px"}} >
                  <label className='l1-super'>Password</label>
                 <input required  type='password' placeholder=' Enter The Password[8 -> 15]characters' 
                 value={newSupervisor.password} onChange={(e)=>setNewSupervisor({...newSupervisor , password :e.target.value})}/>
                </div>  



                <div style={{display:"flex" , margin:"10px 5px"}} >
                  <label className='l-super'>Phone</label>
                 <input required  placeholder=' Enter The phone' type='phone'
                 value={newSupervisor.phone} onChange={(e)=>setNewSupervisor({...newSupervisor , phone :e.target.value})}/>
                </div>  



                {/* 
                <div style={{display:"flex" , margin:"10px 5px"}} >
                  <label className='l-super'>Status</label>
                 <input required   placeholder=' Enter The Status [0 or 1]'
                 value={newSupervisor.status} onChange={(e)=>setNewSupervisor({...newSupervisor , status :e.target.value})} />
                </div>   */}

                 
                 <button className='add-btn'>Add</button>
             </form>
         </div>
        
       </div>
    </div>
  );
}

export default AddSupervisor;
// 
// value={warehouse.supervisor} onChange={(e)=>setWarehouse({...warehouse , supervisor :e.target.value})}
// value={warehouse.location} onChange={(e)=>setWarehouse({...warehouse , location :e.target.value})}
// value={warehouse.status} onChange={(e)=>setWarehouse({...warehouse , status :e.target.value})}
// onSubmit={createWareHouse}