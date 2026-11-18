
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import {login, logout} from './store/authslice'
function App() {
  const dispatch = useDispatch() ; 
  const [loading , setloading ] = useState(true) ; 
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData)dispatch(login(userData));
      else dispatch(logout()) ;
    })
    .finally(() =>{
      setloading(false) ;
    })
  }, [])
 

  return (
    <>
    <h1>Mega Blog App </h1>
    </>
  )
}

export default App
