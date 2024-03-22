import { useEffect, useState } from 'react'
import './App.css'
import LeftMenu from './layout/LeftMenu/LeftMenu'
import Main from './layout/Main/Main'
import Login from './pages/Login/Login'
import { useDispatch as useReduxDispatch, useSelector } from 'react-redux';
import { RootState} from './store/store';

import tokenVarification from './tokenVarification'

import { useDispatch } from 'react-redux';
import { login } from './store/auth.slice';


function App() {

  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(false);

  

  useEffect(() =>{
    setIsLogin(auth.loggedIn)
  },[auth])
 
  useEffect(() => {
    async function checkLoginStatus() {
      const status = await tokenVarification(); 

      if (status && typeof status !== 'boolean') {
        setIsLogin(true);
        dispatch(login({ login: true, id: status.id }));
      } else {
        setIsLogin(false);
      }
    }
  
    checkLoginStatus();
  }, []);


  return (
    <>
    
      {isLogin ? (<>
        <LeftMenu />
        <Main />
      </>) : <Login />}
    </>

  )
}

export default App
