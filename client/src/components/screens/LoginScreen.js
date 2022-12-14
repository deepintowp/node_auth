import { useState, useEffect } from 'react';
import axios from "axios"
import {Link, useNavigate   } from "react-router-dom"
import "./styles/LoginScreen.css"


export  const LoginScreen =  () => {
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    let navigate = useNavigate ();


    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            
            navigate("/")
        }
    }, [])


    const loginHandler = async (e)=>{
        e.preventDefault();
        const config = {
            header:{
                'Content-Type': 'application/json'
            }
        }
       
        
        try {
        
           const {data} = await axios.post("/api/auth/login",{email, password}, config)
           localStorage.setItem("authToken", data.token)
           navigate("/")
        } catch (error) {
            console.log(error);
            setError(error.response.data.error)
            setTimeout(()=>{
                setError("")
            }, 5000)
        }


    }


  return (
    <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
            <h3 className="login-screen__title">Login</h3>
            {error && <span className='error-message' >{error}</span> }
            
            <div className="form-groop">
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                required 
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="form-groop">
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                required 
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            
            <button className='btn btn-primary'  >
                login
            </button>
            <span className='login-screen__subtext'>Not have an account? <Link to="/register">Register</Link></span>

        </form>
    </div>
  )
}

export  default LoginScreen 