import React from 'react'
	

	import {Navigate, Outlet} from 'react-router-dom'
	

	const useAuth=()=>{
	  const user=localStorage.getItem('authToken')
	  if(user){
	    return true
	  } else {
	    return false
	  }
	}
	

	const  PrivateRoute=({children}) =>{
	

	  const auth=useAuth();
	  if(!auth){
		return <Navigate to="/login"/>
	  }
	

	  return children
	}
	

	export default PrivateRoute;
