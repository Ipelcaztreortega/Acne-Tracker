import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import "react-toastify/dist/ReactToastify.css";

function App () {

  const [isAuthenthicated, setIsAuthenthicated] = useState(false);


  // This arrow function takes a boolean, will be used as a Prop, wrapper
  const setAuth = (boolean) => {
    setIsAuthenthicated(boolean);
  };
  
  // This basically checks whenever we are logged in and go to login it will take us back, because else we still have jwt
  async function isAuth () {
    try { // Checks whether or not this person is still validated
      const response = await fetch('http://localhost:3000/auth/is-verify/', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json()
      // console.log(parseRes);
      parseRes === true ? setIsAuthenthicated(true) : setIsAuthenthicated(false);
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    isAuth();
  })


  return(
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route 
              path='/login' 
              // setAuth is the prop name, {setAuth} is the function declared in this App.jsx
              element={!isAuthenthicated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/dashboard" />)}
            /> 
            <Route 
              path='/register' 
              element={!isAuthenthicated ? (<Register setAuth={setAuth}/>) : (<Navigate to="/login" />)}
            />
            <Route 
              path='/dashboard' 
              element={isAuthenthicated ? (<Dashboard setAuth={setAuth}/>) : (<Navigate to="/login" />)}
            />
          </Routes>
        </div>
      </Router>

    </Fragment>
  );
}
export default App;
