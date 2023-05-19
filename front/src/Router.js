
import {
    createBrowserRouter,
  } from "react-router-dom";
import NewWareHouse from "./pages/wareHouses/components/newWareHouse";
import WareHouseList from "./pages/wareHouses/components/wareHouseList";
import AllProducts from "./pages/products/components/allProducts";
import App from "./App";
import { NotFound } from "./shared/notFound";
import SupervisorList from "./pages/supervisor/components/supervisorList";
import AllProductsOfWarehouse from "./pages/wareHouses/components/allProductsOfWarehouse";
import Admin from "./pages/admin/components/admin";
import UpdateWareHouse from "./pages/wareHouses/components/updateWareHouse";
import SupervisorHome from "./pages/supervisor/components/supervisorHome";
import Login from "./pages/login/components/Login";
import AddProduct from "./pages/products/components/addProduct";
import Requests from "./pages/admin/components/requests";
import UpdateProduct from "./pages/products/components/updateProduct";
import Guset from "../src/middleware/Guset";
import AdminM from "../src/middleware/AdminM";
import SupervisorM from "../src/middleware/SupervisorM";
import AddSupervisor from "./pages/supervisor/components/addSupervisor";
import Tst from "./shared/tst";
import UpdateSupervisor from "./pages/supervisor/components/updateSupervisor";
import RequestsOfSupervisor from "./pages/supervisor/components/requestsOfSupervisor";
import HRequests from "./pages/admin/components/requests copy";
import SendRequest from "./pages/admin/components/sendRequest";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children : [
          
          {
            path: "/",
            element: <Login />,
          },
          
          
        
          {
            element:<Guset /> ,
            children:[
              {
                path: "/login",
                element: <Login />,
              }
            ],
          },
          
          //admin 
          {
            element: <AdminM />,
            children:[
              {
                path: "/adminHome",
                element: <Admin />,
              },
              {
                  path: "/warehouseList",
                  element:  <WareHouseList />,
              },
             
              {
                path: "/allProducts",
                element: <AllProducts />,
              },
              {
                path: "/allProductsOfWarehouse/:id",
                element: <AllProductsOfWarehouse />,
              },
              {
                path: "/supervisorList",
                element: <SupervisorList />,
              },
              {
                path: "/addProduct/:id",
                element: <AddProduct />,
              },
              {
                path: "/addWarehouse",
                element: <NewWareHouse/>,
            },
              {
                path: "/updateProduct/:id",
                element: <UpdateProduct />,
              },
              {
                path: "/updateWarehouse/:id",
                element: <UpdateWareHouse />,
              },
              {
                path: "/addSupervisor",
                element: <AddSupervisor />,
              },
              {
                path: "/updateSupervisor/:id",
                element: <UpdateSupervisor />,
              },
              {
                path: "/requests",
                element: <Requests />,
              },
              {
                path: "/history-requests",
                element: <HRequests />,
              },
              {
                path: "/login",
                element: <NotFound />,
              },
             
            ],
          },
        {
          path: "/tst/:id",
          element: <Tst />,
        },
          //superVisor
          {
            element:<SupervisorM />,
      
            children:[
          
              {
                path: "/supervisorHome",
                element: <SupervisorHome/>,
              },
              {
                path: "/requestsOfSuperVisor/:id",
                element: <RequestsOfSupervisor />,
              },
              {
                path: "/sendRequest/:id",
                element: <SendRequest />,
              },
              {
                path: "/login",
                element: <NotFound />,
            },
            ],
          },
            {
              path: "*",
              element: <NotFound />,
          },
        ],
    }
  ]);