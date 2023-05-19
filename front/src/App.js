
import './App.css';

import { HeaderAdmin } from './shared/headerAdmin';

import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
     <HeaderAdmin />
    <Outlet />
    </>
  );
}
/* #49b0d9 */ 
// #2890b9
export default App;
