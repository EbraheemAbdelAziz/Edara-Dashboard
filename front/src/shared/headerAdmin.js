
import { Link, useNavigate } from "react-router-dom";
import imag2 from "../assets/photos/d3m.png";
import "../shared/style/headerAdmin.css"
import { getAuthUser, removeAuthUser } from "../helper.js/Storage";
export const HeaderAdmin = () =>
{
    const navigate = useNavigate();
    const auth = getAuthUser();
    const logout = ()=>{
        removeAuthUser();
        navigate("/login");
    }
    return (
        <header className='main-headerr'>

         <div className='logo2' >
        <img  src={imag2} alt='logo'/>
        
        </div><span className="smallTitle2">Edara</span>
       
        
            {/* authenticated & admin */}
            {
                auth && auth[0].type === 1 && (
                <>
                <nav> 
                <ul className="ulNav2"> 
                <li> <Link className="home2" to={'/adminHome'}>Home</Link></li>
                <li><Link to={'/warehouseList'}>Warehouses</Link></li>
                <li><Link to={'/supervisorList'}>Superviosrs </Link></li>
                <li><Link to={"/requests"}>Waiting Requests</Link></li>
                <li><Link to={"/history-requests"}>History of Requests </Link></li>
               
            </ul>
        </nav>

        <div className="main2" >

         <span className="logout2" >
         <i  class="ri-logout-box-r-line"></i><span onClick={logout} className="s12">Logout</span></span >
        </div></>
                )
            }  
            {/* authenticated & supervisor */}
            {
                auth && auth[0].type === 0 && (
                    <>
                    <nav> 
                <ul className="ulNav2"> 
                <li> <Link to={"/supervisorHome"}>Home</Link> </li>
                <li><Link to={"/requestsOfSuperVisor/"+auth[0].id}>Requests</Link></li>
               
            </ul>
        </nav>

        <div className="main2" >

         <span className="logout2" >
         <i onClick={logout} class="ri-logout-box-r-line"></i><span onClick={logout} className="s12">Logout</span></span >
        </div>
                    </>

                )
            }
                
         {/* <li><a>Requests</a></li> */}

    </header>
    );
}

