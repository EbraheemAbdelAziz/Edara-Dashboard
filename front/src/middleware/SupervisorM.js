
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthUser } from '../helper.js/Storage';
import { HeaderAdmin } from '../shared/headerAdmin';
import { Footer } from '../shared/footer';

const SupervisorM = () => {
    const auth = getAuthUser();

  return (
    <>
    {
        // (!auth) && auth.type === 0 ? <Outlet /> : <Navigate to={"/"} />  
        (auth) && auth[0].type === 0 ?  <>   <Outlet /> <Footer /> </> : <Navigate to={"/"} /> 
    }
    </>
  );
}

export default SupervisorM;