import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import {Routes} from "react-router";
import SignInPage from "./pages/SignIn/signIn";
import Main from "./pages/Main/Main";
import SignUpPage from "./pages/SignUp/signUp";
import React, {useEffect, useState} from "react";
import PrivateRoute from "./hoc/PrivateRoute";
import AppContext from "./context/app.context.js";
import AuthorizationService from "./services/authorization.service";

function App() {

    const [isAuthorized, setIsAuthorized] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [users, setUsers] = useState([])

    useEffect(()=>{
        if(localStorage.token){
            AuthorizationService.checkAuthorization().then(user=>{
                if(user && user.id){
                    setCurrentUser(user)
                    setIsAuthorized(true)
                }
            })
        }
    }, [])



  return (
      <AppContext.Provider value={ {users,  setUsers, isAuthorized, setIsAuthorized, currentUser, setCurrentUser} }>
          <BrowserRouter>
              <Routes>
                  <Route path='/signin' element={
                      <PrivateRoute access={!isAuthorized} redirectLink="/">
                          <SignInPage/>
                      </PrivateRoute>
                  }/>
                  <Route path='/signup' element={
                    <PrivateRoute access={!isAuthorized} redirectLink="/">
                        <SignUpPage/>
                    </PrivateRoute>
                  }/>
                  <Route
                      path='/'
                      element={
                          <PrivateRoute access={isAuthorized} redirectLink="/signin">
                              <Main/>
                          </PrivateRoute>
                      }/>
              </Routes>
          </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
