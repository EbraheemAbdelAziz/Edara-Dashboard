
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import React ,{useState , useEffect} from 'react';
const RequestsOfSupervisor = () => {


  const auth = getAuthUser();
  const [SuperRequests , setSuperRequests ] = useState({
    loading :true,
    result : [],
    err : null,
    reload : 0
  });
  
  useEffect(()=>{
    setSuperRequests({...SuperRequests,loading:true})
    axios
      .get("http://localhost:4000/supervisor/requests",{
        headers:{
         token : auth[0].token,
        }
      } )
      .then((resp) => {
        console.log(resp);
        setSuperRequests({ ...SuperRequests, result:resp.data  , loading:false});
    })
    .catch((err)=>{
      setSuperRequests({...SuperRequests,loading:false , err:"some thing went wrong ,please try again later"});
  });
  },[SuperRequests.reload])


  return (
    <div>
      <div className='tableData1'>
         <h1 style={{padding:"10px" ,border:"solid 1px #e4e4e4" ,borderRadius:"5px",width:"55%",margin:"30px auto" ,backgroundColor:"#e4e4e4"}} className='titleAllProducts'>History of your Requests</h1>
         <table>
  <thead>
    <tr>
      <th>Supervisor Email</th>
      <th>Product name</th>
      <th>Old stock</th>
      <th>Requested stock</th>

      <th>Request(Acceptted or Decline)</th>
    </tr>
  </thead>
  <tbody>
      {SuperRequests.result.map((SuperRequest) => {
        let newState = "";
        if(SuperRequest.status ===1)
        {
           newState = "Accepted";
        }
        else if(SuperRequest.status ===0)
        {
          newState = "Declined";
        }
        else if(SuperRequest.status ===2)
        {
          newState = "Waiting";
        }
        return (
          <tr>
          <td>{SuperRequest.email}</td>
          <td>{SuperRequest.productName}</td>
          <td>{SuperRequest.oldStock}</td>
          <td>{SuperRequest.newStock}</td>
         <td>{newState}</td>
        </tr>);
        }
      )} 

  </tbody>
</table>
</div>
    </div>
  );
}

export default RequestsOfSupervisor;
