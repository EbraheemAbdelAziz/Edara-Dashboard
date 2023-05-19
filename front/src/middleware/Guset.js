import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthUser } from '../helper.js/Storage';
import { Footer } from '../shared/footer';


const Guset= () => {
    const auth = getAuthUser();

  return (
    <>
    {
        (!auth) ?  <>  <Outlet /> <Footer /> </>  : <Navigate to={"/"} />  
    }
    </>
  );
}

export default Guset;