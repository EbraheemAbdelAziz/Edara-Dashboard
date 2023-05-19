import React, {useEffect , useState} from 'react';
import "./style/allProductsOfWarehouse.css"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthUser } from '../../../helper.js/Storage';
const AllProductsOfWarehouse = () => {

   var {id} = useParams();
  const auth = getAuthUser();

    const [products , setProducts ] = useState({
      loading :true,
      result : [],
      err : null,
      reload : 0
    })
    
    useEffect(()=>{
      setProducts({...products,loading:true})
      axios
        .get("http://localhost:4000/products/" + id ,
        {
          headers:{
           token : auth[0].token,
          }
        } )
        .then((resp) => {
          setProducts({ ...products, result : resp.data , loading:false});
          console.log(resp);
      })
      .catch((err)=>{
        console.log("false");
        setProducts({...products,loading:false , err:"some thing went wrong ,please try again later"});
    });
    },
    [products.reload]);

    
    const deleteProduct = (productid) => {
      axios
      .delete("http://localhost:4000/products/" + productid ,
      {
        headers:{
         token : auth[0].token,
        }
      } 
      )
      .then((resp) => {
        setProducts({ ...products, reload:products.reload + 1 });
        console.log(resp);
    })
    .catch((err)=>{
      console.log("false");
  
      setProducts({...products , loading:false , err:"some thing went wrong ,please try again later"});
  });  
    }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",width:"95%"}}>
      <h1 style={{padding:"10px" ,border:"solid 1px black" ,borderRadius:"20px",width:"15%",margin:"30px 0px 50px 150px" ,backgroundColor:"#e4e4e4"}} 
      className='titleAllProducts'>All Products</h1>
      <button className='addPro' style={{padding:"10px 30px",marginTop:"45px",marginRight:"80px",height:"40px"}}
      ><Link to={"/addproduct/"+id}>Add New Product</Link></button>
      </div>
    <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Descirption</th>
      <th>Stock</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {products.result.map((product) => {
    return (
      <tr>
      <td>{product.name}</td>
      <td>{product.discription}</td>
      <td>{product.stock}</td>
      <td>
        <button className='edit'><Link to={"/updateProduct/"+product.id}>Update</Link></button>
        <button className='del'onClick={(e)=>{deleteProduct(product.id)}}>Delete</button>
      </td>
    </tr>
    )
  })}  
  </tbody>
</table>

    </div>
  );
}

export default AllProductsOfWarehouse;
