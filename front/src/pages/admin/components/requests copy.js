
import "./style/requests.css"
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import React ,{useState , useEffect} from 'react';

const HRequests = () => {
  const auth = getAuthUser();
  const [finishrRequests , setFinishrRequests ] = useState({
    loading :true,
    result : [],
    err : null,
    reload : 0
  })
  
  useEffect(()=>{
    setFinishrRequests({...finishrRequests,loading:true})
    axios
      .get("http://localhost:4000/admin/requests/history",{
        headers:{
         token : auth[0].token,
        }
      } )
      .then((resp) => {
        setFinishrRequests({ ...finishrRequests, result:resp.data  , loading:false});
    })
    .catch((err)=>{
      setFinishrRequests({...finishrRequests,loading:false , err:"some thing went wrong ,please try again later"});
  });
  },[finishrRequests.reload]);
  return (
    <>

<div className='tableData1'>
         <h1 style={{padding:"10px" ,border:"solid 1px #e4e4e4" ,borderRadius:"5px",width:"55%",margin:"30px auto" ,backgroundColor:"#e4e4e4"}} className='titleAllProducts'>History of all Requests for all Supervisor</h1>
    <table>
  <thead>
    <tr>
      
      <th>Supervisor Email</th>
      <th>Product name</th>
      <th>Requested stock</th>
      <th>New stock</th>
      <th>Request(Acceptted or Decline)</th>
    </tr>
  </thead>
  <tbody>
      {finishrRequests.result.map((finishrRequest) => {
        let newState = "";
        if(finishrRequest.status ===1)
        {
           newState = "Accepted";
        }
        else if(finishrRequest.status ===0)
        {
          newState = "Declined";
        }
        return (
          <tr>
          
          <td>{finishrRequest.email}</td>
          <td>{finishrRequest.productName}</td>
          <td>{finishrRequest.requestStock}</td>
          <td>{finishrRequest.newStock}</td>
         <td>{newState}</td>
        </tr>);
        }
      )} 
      
       
      
  </tbody>
</table>
</div>
    </>


  );
}

export default HRequests;
