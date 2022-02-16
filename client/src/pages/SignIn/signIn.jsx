import React, {useEffect, useState, useContext} from "react";
import './signIn.css'
import AuthorizationService from "../../services/authorization.service";
import {Navigate, Link} from "react-router-dom";
import AppContext from "../../context/app.context";

const SignInPage = () => {

    let [user, setUser] = useState({ email: '',password: '' })

    let [errors, setErrors] = useState('')
    let [disabledButton, setDisabledButton] = useState(false)

    let {setIsAuthorized, setCurrentUser, isAuthorized} = useContext(AppContext)

    useEffect(() => {
        setErrors('')
    }, [setUser])


    const signInHandler = async () => {
        setDisabledButton(true)
        const response = await AuthorizationService.login(user.email, user.password)
        if (!response) {
            setCurrentUser(null)
            setIsAuthorized(false)
        }
        else {
            setCurrentUser(response)
            setIsAuthorized(true)
        }
        setDisabledButton(false)
    }


    return !isAuthorized?(
        <div className="sign-in-container">
            <h1>Sign in</h1>
            <form action="" className="sign-in-form">
                <input type="email" placeholder="email" onChange={ e => setUser(prevState => ({...prevState, email: e.target.value})) }/>
                <input type="password" placeholder="password" onChange={ e => setUser(prevState => ({...prevState, password: e.target.value})) }/>
                <button type="button" onClick={signInHandler} disabled={disabledButton}>Sign in</button>
                <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p>
            </form>
            <p className="sign-in-error-message">{errors || ''}</p>
        </div>
    ):<Navigate to='/app'/>
}

export default SignInPage