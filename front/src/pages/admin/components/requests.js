
import "./style/requests.css"
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { getAuthUser } from '../../../helper.js/Storage';
import React ,{useState , useEffect} from 'react';

const Requests = () => {
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
        // console.log(resp.data[0]);
        //console.log(finishrRequests.result);
    })
    .catch((err)=>{
      setFinishrRequests({...finishrRequests,loading:false , err:"some thing went wrong ,please try again later"});
  });
  },[finishrRequests.reload]);

///---------------------------

const [WatingRequests , setWatingRequests ] = useState({
  loading :true,
  result : [],
  err : null,
  reload : 0
})

useEffect(()=>{
  setWatingRequests({...WatingRequests,loading:true})
  axios
    .get("http://localhost:4000/admin/requests",
    {
      headers:{
       token : auth[0].token,
      }
    } )
    .then((resp) => {
      console.log(resp);
      setWatingRequests({ ...WatingRequests, result:resp.data  , loading:false,reload:WatingRequests.reload+1});
      console.log(WatingRequests.result);
  })
  .catch((err)=>{
    setWatingRequests({...WatingRequests,loading:false , err:"some thing went wrong ,please try again later"});
});
},[WatingRequests.reload]);




const acceptRequest = (requestID,requestStatus) =>{
  axios
  .put("http://localhost:4000/admin/requests/" + requestID ,{
    status:requestStatus,
  },
  {
    headers:{
     token : auth[0].token,
    }
  } 
  )
  .then((resp) => {
    setWatingRequests({ ...WatingRequests, reload:WatingRequests.reload + 1 });
    console.log(resp);
})
.catch((err)=>{
  console.log("false");
  setWatingRequests({...WatingRequests , loading:false , err:"some thing went wrong ,please try again later"});
});  
}
  const declineRequest = (requestID,requestStatus) =>{
    axios
    .put("http://localhost:4000/admin/requests/" + requestID ,{
      status:requestStatus
    },
    {
      headers:{
       token : auth[0].token,
      }
    } 
    )
    .then((resp) => {
      setWatingRequests({ ...WatingRequests, reload:WatingRequests.reload + 1 });
      console.log(resp);
  })
  .catch((err)=>{
    console.log("false");
    setWatingRequests({...WatingRequests , loading:false , err:"some thing went wrong ,please try again later"});
  });  
}

  return (
    <>
       <div className='tableData1'>
         <h1 style={{padding:"10px" ,border:"solid 1px #e4e4e4" ,borderRadius:"20px",width:"80%",margin:"30px auto" ,backgroundColor:"#e4e4e4"}} className='titleAllProducts'>Requests</h1>
    <table>
  <thead>
    <tr>
      
      <th>Supervisor Email</th>
      <th>Product name</th>
      <th>Old stock</th>
      <th>New stock</th>
      <th>Request</th>
    </tr>
  </thead>
  <tbody>
    {/* <tr>
      <td>John</td>
      <td>25</td>
      <td>New York</td>
      <td>New York</td>
      
    </tr> */}

{WatingRequests.result.map((WatingRequest) => {

        return (
          <tr>
         
          <td>{WatingRequest.email}</td>
          <td>{WatingRequest.productName}</td>
          <td>{WatingRequest.oldStock}</td>
          <td>{WatingRequest.newStock}</td>
          <td>
            <div class="col col-5"><button class= "btn-d2" onClick={(e)=>{acceptRequest(WatingRequest.requestId,1)}}>Accept</button>
         <button class= "btn-d3" onClick={(e)=>{declineRequest(WatingRequest.requestId,2)}}>Decline</button>
          </div>
          </td>
        </tr>);
        }
      )} 
  
 
  </tbody>
</table>
</div> 

    </>


  );
}

export default Requests;
