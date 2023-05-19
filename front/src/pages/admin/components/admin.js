import React from 'react';
import "./style/admin.css"
import image from "../../../assets/photos/ware.jpg";

import image3 from "../../../assets/photos/super.jpg";
import image4 from "../../../assets/photos/Request.jpg";
import image5 from "../../../assets/photos/his.jpg";
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    <div className='home-list'>


      <div className="product-card">
      <Link to={"/warehouseList"}>
      <div className="card-top">
      <img src={image} alt="photo"/>
      </div>
      <button className='b1'> WareHouses</button>
      </Link>
      </div>


    

      <div className="product-card">
      <Link to={"/supervisorList"}>
      <div className="card-top">
      <img src={image3} alt="photo"/>
      </div>
        <button className='b1'> Supervisors</button>
        </Link>
      </div>

      

      <div className="product-card">
      <Link to={"/requests"}>
      <div className="card-top">
      <img src={image4} alt="photo"/>
      </div>
        <button className='b1'>Requests </button>
        </Link>
      </div>

      <div className="product-card">
      <Link to={"/history-requests"}>
      <div className="card-top">
      <img src={image5} alt="photo"/>
      </div>
        <button className='b1'>History Of Requests</button>
        </Link>
      </div>


    </div>
  );
}

export default Admin;
