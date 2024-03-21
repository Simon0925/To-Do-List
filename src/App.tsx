import { useEffect, useState } from 'react'
import './App.css'
import LeftMenu from './layout/LeftMenu/LeftMenu'
import Main from './layout/Main/Main'
import Login from './pages/Login/Login'
import { useDispatch as useReduxDispatch, useSelector } from 'react-redux';
import { RootState} from './store/store';

import tokenVarification from './tokenVarification'


function App() {

  const auth = useSelector((state: RootState) => state.auth);


  const [isLogin, setIsLogin] = useState(false);

  

  useEffect(() =>{
    setIsLogin(auth.loggedIn)
  },[auth])
 

  useEffect(() => {
    async function checkLoginStatus() {
      const status = await tokenVarification(); 
      setIsLogin(!!status); 
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
