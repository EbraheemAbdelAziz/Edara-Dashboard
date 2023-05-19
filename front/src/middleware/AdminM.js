
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthUser } from '../helper.js/Storage';
import { HeaderAdmin } from '../shared/headerAdmin';
import { Footer } from '../shared/footer';


const AdminM = () => {
    const auth = getAuthUser();

  return (
    <>
    {
        // (!auth) && auth.type ===1 ? <Outlet /> : <Navigate to={"/"} />
        (auth) && auth[0].type ===1 ? <>   <Outlet /> <Footer /> </>: <Navigate to={"/"} />  
    }
    </>
  );
}

export default AdminM;