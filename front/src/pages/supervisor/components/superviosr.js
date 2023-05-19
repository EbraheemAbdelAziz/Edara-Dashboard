import React, {useEffect , useState} from 'react';
import axios from 'axios';
import "./style/supervisor.css";
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../../helper.js/Storage';
const Superviosr = () => {
  const auth =getAuthUser();
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

  const deleteSupervisor = (id) => {
    axios
     .delete("http://localhost:4000/supervisors/" + id ,
     {
       headers:{
        token : auth[0].token,
       }
     } 
     )
     .then((resp) => {
      setsupervsors({ ...supervsors, reload:supervsors.reload + 1 });
       console.log(resp);
   })
   .catch((err)=>{
     console.log("false");
     setsupervsors({...supervsors , loading:false , err:"some thing went wrong ,please try again later"});
 });  

  }
  return (
    <div>
    <table>
  <thead>
    <tr>

      <th>Superviosr ID</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Action</th>

    </tr>
  </thead>
  <tbody>
  {supervsors.result.map((supervsor) => { 
    let state = "";
    if(supervsor.status===1)
    {
      state="active";
    }
    else if(supervsor.status===0)
    {
      state="in-active";
    }
    return ( 
      <tr>
      <td>{supervsor.id}</td>
      <td>{supervsor.email}</td>
      <td>{supervsor.phone}</td>
      <td>{state}</td>
      <td>
        <button className='btn-d2'><Link to={"/updateSupervisor/"+supervsor.id}> Update </Link> </button>
        {/* <button className='btn2'><Link to={"/updateWarehouse/"+warehouse.id}> Update </Link></button> */}
        <button className='btn-d3' onClick={(e)=>{deleteSupervisor(supervsor.id)}}>Delete</button>
      </td>
    </tr>
    )
  })}
    
  </tbody>
</table>

    </div>
  );
}

export default Superviosr;
