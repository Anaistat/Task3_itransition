import React, {useContext} from "react";
import AppContext from "../../../context/app.context.js";

const User = ( {user} ) => {

    const {setUsers} = useContext(AppContext)

    const checkUserHandler = (event) => {
        setUsers(prevState => {
            return prevState.map(e => {
                if (e._id === user._id) e.isChecked = event.target.checked
                return e
            })
        })
    }

    return(
        <div className="table-row">
            <div><input type="checkbox" value={user._id} checked={user.isChecked} onChange={checkUserHandler}/></div>
            <div>{user._id}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.registrationDate.toLocaleString()}</div>
            <div>{user.lastLoginDate.toLocaleString()}</div>
            <div style={{color: user.status === 'Block'? 'darkred': 'green'}}>{user.status}</div>
        </div>
    )
}

export default User