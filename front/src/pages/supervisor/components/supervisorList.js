import React from 'react';
import Superviosr from './superviosr';
import { Link } from 'react-router-dom';

const SupervisorList = () => {

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",width:"95%"}}>
      <h1 style={{padding:"10px" ,border:"solid 1px black" ,borderRadius:"20px",width:"16%",margin:"30px 0px 50px 150px" ,backgroundColor:"#e4e4e4"}} 
      className='titleAllProducts'>Supervisor List</h1>
      <button className='addPro' style={{marginRight:"200px",padding:"10px 30px",marginTop:"45px",marginRight:"80px",height:"40px"}}
      ><Link to={"/addSupervisor"}>Add New Supervisor</Link></button>
       </div>
       <Superviosr />
    </div>
  );
}

export default SupervisorList;