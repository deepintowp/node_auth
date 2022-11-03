import { useState, useEffect } from 'react';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import "./styles/RegisterScreen.css"


const RegisterScreen =  ({history}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            navigate("/")
        }
    }, [])


    const registerHandler = async (e)=>{
        e.preventDefault();
        const config = {
            header:{
                "Content-type":"application/json"
            }
        }
        if(password !== confirmPassword){
            setPassword("")
            setConfirmPassword("")
            setTimeout(()=>{
                setError("")
            }, 5000)
        }
        try {
        
           const {data} = await axios.post("/api/auth/register",{username, email, password}, config)
           localStorage.setItem("authToken", data.token)
           navigate("/")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(()=>{
                setError("")
            }, 5000)
        }


    }


  return (
    <div className="register-screen">
        <form onSubmit={registerHandler} className="register-screen__form">
            <h3 className="register-screen__title">Register</h3>
            {error && <span className='error-message' >{error}</span> }
            <div className="form-groop">
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                required 
                id="name"
                placeholder="Enter Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
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
            <div className="form-groop">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                type="password"
                required 
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </div>
            <button className='btn btn-primary'  >
                Register
            </button>
            <span className='register-screen__subtext'>Already have an account? <Link to="/login">Login</Link></span>

        </form>
    </div>
  )
}

export default RegisterScreen