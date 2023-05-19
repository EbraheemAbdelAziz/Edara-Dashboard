import React, { useState ,useEffect } from 'react';
import "../components/style/updateWareHouse.css"
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import { useParams } from 'react-router-dom';

const UpdateWareHouse = () => {


  let { id } = useParams();
  const auth = getAuthUser();

    const [warehouse, setWarehouse] = useState({
        name: "",
        location: "",
        status:"",
        supervisorId:"",
        err: "",
        loading: false,
        reload: false,
        success: null,
    });

   
    const updateWareHouse = (e) => {
        e.preventDefault();

        setWarehouse({ ...warehouse, loading: true });
        axios
            .put("http://localhost:4000/warehouses/update-warehouse/" + id, {
              name: warehouse.name,
              location:warehouse.location,
              supervisorId: warehouse.supervisorId,
              status: warehouse.status
            },{
                headers: {
                    token: auth[0].token,
                    "Content-Type":"application/json"
                },
            })
            .then((resp) => {
              console.log(resp);
              setWarehouse({
                    ...warehouse,
                    loading: false,
                    success: "Warehouse updated successfully !",
                    reload: warehouse.reload + 1,
                });
            })
            .catch((err) => {
              console.log(err);
              setWarehouse({
                    ...warehouse,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    };
    useEffect(() => {
      axios
          .get("http://localhost:4000/warehouses/" + id ,{
            headers: {
                token: auth[0].token,   
            },
        }
          )
          .then((resp) => {
            // console.log(resp);
            setWarehouse({
                  name: resp.data[0].name,
                  location: resp.data[0].location,
                  status: resp.data[0].status,
                  supervisorId:resp.data[0].supervisorId,
              });
          })
          .catch((err) => {
            console.log(err);
            setWarehouse({
                  ...warehouse,
                  loading: false,
                  success: null,
                  err: "Something went wrong, please try again later !",
              });
          });
  }, [warehouse.reload]);
  

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
      <>
      {warehouse.err&&(
           <label>
           <input type="checkbox" class="alertCheckbox" autocomplete="off" />
           <div class="alert error">
             <span class="alertClose">X</span>
             <span class="alertText">{warehouse.err}
             <br class="clear"/></span>
           </div>
           </label>
        )}
         {warehouse.success&&( 
          <label>
          <input type="checkbox" class="alertCheckbox" autocomplete="off" />
          <div class="alert success">
            <span class="alertClose">X</span>
            <span class="alertText">{warehouse.success}
            <br class="clear"/></span>
          </div>
        </label>
        )}</>
       <div className='form-container22'>
         <h1 className='newWare-t22'>Update Warehouse</h1>
         <div className='form-new22'>
             <form onSubmit={updateWareHouse}>
              
              <div className='d1'>
                
              <label className='l22'>Name</label>
                 <input className='in1' type='text' value={warehouse.name} onChange={(e)=>setWarehouse({...warehouse , name:e.target.value})} />

              </div>
                 <label className='l22' >Supervisior Email</label>
          
                 <select className='in1'onChange={(e)=>setWarehouse({...warehouse , supervisorId:e.target.value})}>
                 <option  value={""} ></option>
                  {
                    supervsors.result.map((supervisor)=>{
                     return(
                      <option defaultValue={""} value={supervisor.id} >{supervisor.email}</option>
                     );
                    })
                  }
                  </  select>
                 {/* <input className='in1'   value={warehouse.supervisorId} onChange={(e)=>setWarehouse({...warehouse , supervisorId:e.target.value})} /> */}
                 <label className='l22' htmlFor='location'>Location</label>
                 <input   className='in1'  value={warehouse.location} onChange={(e)=>setWarehouse({...warehouse , location:e.target.value})} />
                 <label className='l22' htmlFor='status'>Status</label>
                 <select className='in1' onChange={(e)=>setWarehouse({...warehouse , status:e.target.value})}>
                    <option value={warehouse.status}></option>
                    <option value={1} >active</option>
                    <option value={0}>in-active</option>
                  </  select>
                 {/* <input  className='in1'  type='status' value={warehouse.status} onChange={(e)=>setWarehouse({...warehouse , status:e.target.value})}/> */}
                 <button className='add-btn22'>Update</button>
             </form>
           </div>
       </div>
     </div>
   );
}

export default UpdateWareHouse;
