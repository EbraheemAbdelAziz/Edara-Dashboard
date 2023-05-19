import React, { useState ,useEffect } from 'react';
import "./style/updateSupervisor.css"
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import { useParams } from 'react-router-dom';

const UpdateSupervisor = () => {
  var {id} = useParams();

  const auth = getAuthUser();

    const [supervisor, setSupervisor] = useState({
        email: "",
        password: "",
        phone:"",
        err: "",
        loading: false,
        reload: false,
        success: null,
    });

   
    const updateSupervisor = (e) => {
        e.preventDefault();

        setSupervisor({ ...supervisor, loading: true });
        axios
            .put("http://localhost:4000/supervisors/update-supervisor/" + id, {
              email: supervisor.email,
              password:supervisor.password,
              phone: supervisor.phone,
              
            },{
                headers: {
                    token: auth[0].token,
                    "Content-Type":"application/json"
                },
            })
            .then((resp) => {
              console.log(resp);
              setSupervisor({
                    ...supervisor,
                    loading: false,
                    success: "Supervisor updated successfully !",
                    reload: supervisor.reload + 1,
                });
            })
            .catch((err) => {
              console.log(err);
              setSupervisor({
                    ...supervisor,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    };
    useEffect(() => {
      axios
          .get("http://localhost:4000/supervisors/" + id ,{
            headers: {
                token: auth[0].token,   
            },
        }
          )
          .then((resp) => {
            // console.log(resp);
            setSupervisor({
                  email: resp.data[0].email,
                  password: resp.data[0].password,
                  phone: resp.data[0].phone,
              });
          })
          .catch((err) => {
            console.log(err);
            setSupervisor({
                  ...supervisor,
                  loading: false,
                  success: null,
                  err: "Something went wrong, please try again later !",
              });
          });
  }, [supervisor.reload]);



 
  return (
    <div>
        {
          supervisor.err && (
              <h4>{supervisor.err} </h4>
            
          )
        } 
        {
          supervisor.successMessage && (
            <h4>{supervisor.successMessage} </h4>
           
          )
        } 
        
        <div className='form-container-super'>
         <h1 className='t-superU'>Update Supervisor</h1>
         <div className='form-new'>
             <form onSubmit={updateSupervisor}>
                
                  <div style={{display:"flex" , margin:"10px 10px"}} >
                  <label className='l-super'>Email</label>
                 <input required className='uInput' type='email' placeholder=' Enter The Email'  
                 value={supervisor.email} onChange={(e)=>setSupervisor({...supervisor , email :e.target.value})}/>
                </div>  
              
                <div style={{display:"flex" , margin:"10px 5px"}} >
                  <label className='l1-super'>Password</label>
                 <input required className='uInput' type='password' placeholder=' Enter The Password' 
                  onChange={(e)=>setSupervisor({...supervisor , password :e.target.value})}/>
                </div>  



                <div style={{display:"flex" , margin:"10px 5px"}} >
                  <label className='l-super'>Phone</label>
                 <input required className='uInput' placeholder=' Enter The phone' 
                 value={supervisor.phone} onChange={(e)=>setSupervisor({...supervisor , phone :e.target.value})}/>
                </div>  




               

                 
                 <button className='u-btn'>Updated</button>
             </form>
         </div>
        
       </div>
    </div>
  );
}

export default UpdateSupervisor;
// 
// value={warehouse.supervisor} onChange={(e)=>setWarehouse({...warehouse , supervisor :e.target.value})}
// value={warehouse.location} onChange={(e)=>setWarehouse({...warehouse , location :e.target.value})}
// value={warehouse.status} onChange={(e)=>setWarehouse({...warehouse , status :e.target.value})}
// onSubmit={createWareHouse}