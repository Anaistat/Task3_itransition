import React, {useCallback, useContext, useEffect, useState} from "react";
import './signUp.css'
import AppContext from "../../context/app.context.js";
import AuthorizationService from "../../services/authorization.service";
import {Link, Navigate} from "react-router-dom";

const SignUpPage = () => {

    let [userInfo, setUserInfo] = useState( {
        name: '',
        email: '',
        password: ''
    } )

    let [errors, setErrors] = useState('')
    let [disabledButton, setDisabledButton] = useState(false)

    const {setIsAuthorized, setCurrentUser, isAuthorized} = useContext(AppContext)


    let signUpHandler = () => {
        setDisabledButton(true)
        AuthorizationService.registration(userInfo.name, userInfo.email, userInfo.password)
            .then(user => {
                if(user && user.name){
                    setCurrentUser(user)
                    setIsAuthorized(true)
                }
                else{
                    setCurrentUser({})
                    setIsAuthorized(false)
                    setErrors('Unexpected error')
                    setDisabledButton(false)
                }


            })
            .catch(err => {
                setCurrentUser({})
                setIsAuthorized(false)
                setErrors(err)
                setDisabledButton(false)
            })
    }


    return !isAuthorized?(
        <div className="sign-in-container">
            <h1>Sign up</h1>
            <form action="" className="sign-in-form">
                <input type="text" placeholder="Name" onChange={ e => setUserInfo(prevState => ({...prevState, name: e.target.value})) }/>
                <input type="email"  placeholder="Email" style={ {borderColor: errors?'darkred':'transparent'} } onChange={ e => setUserInfo(prevState => ({...prevState, email: e.target.value})) }/>
                <input type="password"  placeholder="Password" onChange={ e => setUserInfo(prevState => ({...prevState, password: e.target.value})) }/>
                <button type="button" disabled={disabledButton} onClick={signUpHandler}>Sign up</button>
            </form>
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            <p className="sign-up-error-message">{errors}</p>
        </div>
    ):<Navigate to="/app"/>
}

export default SignUpPage