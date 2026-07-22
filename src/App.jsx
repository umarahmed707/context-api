import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import { useCallback, useContext, useEffect } from 'react';
import { GlobalContext } from './Context/Context';
import axios from 'axios';

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  const checkuser = useCallback(async () => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      dispatch({ type: "USER_LOGOUT" });
      return;
    }

    try {
      const apires = await axios.get("https://dummyjson.com/auth/me", {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      dispatch({ type: "USER_LOGIN", user: { ...apires.data, accessToken: userToken } });
    } catch (error) {
      localStorage.removeItem("userToken");
      dispatch({ type: "USER_LOGOUT" });
      console.log(error);
    }
  }, []);

  useEffect(() => {
    checkuser();
  }, [checkuser]);

  return (
    <div>
      {state.isLogin == null ? (
        <h1>Loading....</h1>
      ) : state.isLogin ? (
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to={"/home"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to={"/login"} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;