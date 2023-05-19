import React, { useState ,useRef,useEffect } from 'react';
import "../components/style/addProduct.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../../../helper.js/Storage';
const UpdateProduct = () => {
  
  let { id } = useParams();
    const auth = getAuthUser();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        productId:"",
        stock:"",
        err: "",
        photo:"",
        image_url:"",
        warehouseId:"",
        loading: false,
        reload: false,
        success: null,
    });
    const image = useRef(null);

    const updateProduct = (e) => {
        e.preventDefault();

        setProduct({ ...product, loading: true });
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("discription", product.description);
        formData.append("stock", product.stock);
        if (image.current.files && image.current.files[0]) {
            formData.append("photo", image.current.files[0]);
        }
        axios
            .put("http://localhost:4000/products/update-product/" + id, formData,{
                headers: {
                    token: auth[0].token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                     setProduct({
                    ...product,
                    loading: false,
                    success: "Product updated successfully !",
                    reload: product.reload + 1,
                });
            })
            .catch((err) => {
              setProduct({
                    ...product,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    };
    useEffect(() => {
        axios
            .get("http://localhost:4000/products/update-product/" +id)
            .then((resp) => {
              console.log(resp.data[0].photo);
              setProduct({
                    name: resp.data[0].name,
                    description: resp.data[0].discription,
                    image_url: resp.data[0].photo,
                    stock:resp.data[0].stock,
                   
                });
                //image.current.value=resp.data[0].photo
            })
            .catch((err) => {
              setProduct({
                    ...product,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    }, [product.reload]);

  return (
    <div>
      <>
      {product.err&&(
          <h1>{product.err}</h1>
        )}
         {product.success&&( 
          <h1>{product.success}</h1>
        )}</>
       <div>
       <div className='form-container3' style={{border:"2px solid black"}}>
         <h1 className='newWare-t3' style={{}}>Update Product</h1>
         <img 
         //src={product.image_url}
        src={"http://localhost:4000/"+product.image_url}

         alt={product.name}
         style={{
          width:"50%",
          height:"250px",
          objectFit:"contain",
          borderRadius:"10px",
          border:"1px solid #ddd",
          marginTop:"15px",   
          marginLeft:"165px",
          marginBottom:"-30px"
         }}
         />
        
         <div className='form-new3'>
              
             <form onSubmit={updateProduct}>
                 <label className='l3'>Name</label>
                 <input   type='text' placeholder='Enter The New name of Product'
                  value={product.name}  onChange={(e)=>setProduct({...product,name: e.target.value})}/>
                 
                 <label className='l3' htmlFor='supervisor'>Stock</label>
                 <input  type='text' placeholder='Enter stoke of Product'
                  value={product.stock}  onChange={(e)=>setProduct({...product,stock:e.target.value})} />
                 
                 <label className='l3'>Description</label>
                 <input   type='text' placeholder='Enter The Description' rows={500}
                 value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}/>

                 <label className='l3' htmlFor='status'>Image <input className='imagefiled' type='file' ref={image} /> </label>
                 <button className='add-btn3'>Update</button>
             </form>
         </div>
        
       </div>
     </div>
    </div>
  );
}

export default UpdateProduct;
