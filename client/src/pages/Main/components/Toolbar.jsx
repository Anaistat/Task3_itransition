import React, { useContext } from "react";
import AppContext from "../../../context/app.context.js";
import {Button} from 'react-bootstrap';
import { TrashFill, LockFill, UnlockFill } from 'react-bootstrap-icons';
import AuthorizationService from "../../../services/authorization.service.js";
import {Navigate} from "react-router-dom";
import UserService from "../../../services/user.service";


const Toolbar = () => {

    const { currentUser, users, setUsers, setIsAuthorized, setCurrentUser} = useContext(AppContext)

    const signOut = async () => {
        await AuthorizationService.logout()
        setIsAuthorized(false)
        setCurrentUser({})
        return <Navigate to='/signin'/>
    }

    let requestUsers = () => {
        UserService.getUsers().then(setUsers)
    }

    let changeStatus = async status => {
        const promises = users.filter(e => e.isChecked).map(e => UserService.changeStatus(e._id, status))
        await Promise.all(promises)
        if (users.find(e => e.isChecked && e._id === currentUser.id && status !== 'Active')) {
            setIsAuthorized(false)
            setCurrentUser(null)
            await AuthorizationService.logout()
            return <Navigate to='/signin'/>
        }
        requestUsers()
    }
    return(
        <>
            {currentUser && <h1>Hello, <b>{currentUser.name}</b>!</h1>}
            <nav className="toolbar-container">
                <Button variant='outline-danger' onClick={signOut}>Sign out</Button>
                <Button variant='warning' onClick={()=>changeStatus('Block')}>Block<LockFill/></Button>
                <Button variant="success" onClick={()=>changeStatus('Active')}>Unblock<UnlockFill/></Button>
                <Button variant="outline-secondary" onClick={()=>changeStatus('Delete')}><TrashFill size={36} color="#ccc"/></Button>
            </nav>
        </>
    )
}

export default Toolbar