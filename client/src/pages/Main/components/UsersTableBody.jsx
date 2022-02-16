import React, {useContext, useEffect} from "react";
import User from "./User";
import AppContext from "../../../context/app.context.js";


const UsersTableBody = () => {

    const {users} = useContext(AppContext)

    return(
        <>
            {users.map(e => <User user={e} key={"user-" + e._id}/>)}
        </>
    )
}

export default UsersTableBody