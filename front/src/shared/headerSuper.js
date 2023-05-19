
import { Link } from "react-router-dom";
import image from "../assets/photos/d1.jpg";
import imag2 from "../assets/photos/d3m.png";
import "../shared/style/headerSuper.css"
export const HeaderSuper = () =>
{
    const logout = ()=>{
        
    }
    return (
        <header className='main-header'>

         <div className='logo' >
        <img  src={imag2} alt='logo'/>
        
        </div><span className="smallTitle">Edara</span>
        <nav> 
            <ul className="ulNav">
            <li> <Link className="home2" to={'/adminHome'}>Home</Link></li>
                <li><Link to={'/warehouseList'}>Warehouses</Link></li>
                <li><Link to={'/allProducts'}>Products</Link></li>
                <li><Link to={'/supervisorList'}>Superviosrs </Link></li>
                <li>
                    <Link to={"/supervisorHome"}>Home</Link>
                    {/* <a className="home">Home</a> */}
                </li>
               
                <li><a>All Requests</a></li>
                
                <li><a>Requests</a></li>
            </ul>
        </nav>

        <div className="main" >

         <span className="logout" >
         <i onClick={logout} class="ri-logout-box-r-line"></i><span onClick={logout} className="s1">Logout</span></span >
        </div>
        <></>

    </header>
    );
}

