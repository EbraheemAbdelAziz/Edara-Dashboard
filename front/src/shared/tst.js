import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Tst = () => {
    var {id} = useParams();
    const [warehousee , setWarehousee] = useState(
        {
            loading :true,
            results:[],
            err: null,
            reload:0
        }
    )

    useEffect(() => {
        
        setWarehousee({...warehousee , loading:true })
      axios.get("http://localhost:4000/warehouses/"+id)
      .then((resp)=>{
        console.log(resp);
        setWarehousee({...warehousee ,results:resp.data, loading:false });

      }).catch((err)=>{
        setWarehousee({...warehousee , loading:false ,err:"something went wrong" });

      })
    }, []);
  return (
    <div>
     <h2></h2>
     <h1></h1>
     <h1></h1>
     <h1></h1>
     <h1></h1>
     <h1></h1>
    </div>
  );
}

export default Tst;
