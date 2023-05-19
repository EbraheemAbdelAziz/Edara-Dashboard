import React, { useState } from 'react';
import  '../components/login.css'
// import Alert from "react-bootstrap/Alert";
import"../components/alert.css"
import axios from 'axios';
import { getAuthUser, setAuthUser } from '../../../helper.js/Storage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate= useNavigate(); 
  const [login ,setLogin] = useState({
    email:'',
    password:'',
    loading : false,
    err:null,
  });


  const LoginFun = (event)=>{
    event.preventDefault();
    setLogin({...login , loading:true , err:[]});
    axios.post("http://localhost:4000/auth/login",{
      email:login.email,
      password:login.password,
    }).then((resp) =>{
      setAuthUser(resp.data);
      const auth = getAuthUser();
      setLogin({...login , loading:false , err:null});
       //navigate("/adminHome");
       if(auth && auth[0].type === 1){navigate("/adminHome")}   
       else if(auth && auth[0].type === 0) 
       {navigate("/supervisorHome")}
    }).catch((err)=>{
      setLogin({...login , loading:false , err:"Email or Password is not correct ..!"})
    });
  }

  return (
    <div className='container'>
        <form onSubmit={LoginFun}>
        <h1>Login Into Edara Dashboard</h1>
      
        {login.err&& (
           <label>
           <input type="checkbox" class="alertCheckbox" autocomplete="off" />
           <div class="alerterror1">
             <span class="alertClose">X</span>
             <span class="alertText">{login.err}
             <br class="clear"/></span>
           </div>
           </label>
        )}
        <div className='txt-field'>
        <label  className='label' htmlFor='email'>Email</label>
        <input required className='input1' type='email' placeholder='Enter Username' value={login.email} onChange={(e)=>setLogin({...login, email: e.target.value})} />
        </div>
        <div className='txt-field'>
        <label className='label' htmlFor='password'>Password</label>
        <input required className='input2' type='password' placeholder='Enter Password' value={login.password} onChange={(e)=>setLogin({...login, password: e.target.value})} />
        </div>
        <button className='btn' disabled={login.loading===true}>Login</button>
        </form>
    </div>
  );
}

export default Login;

 