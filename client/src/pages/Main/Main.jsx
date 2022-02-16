import React, {useEffect, useState, useContext} from "react";
import './Main.css'
import UsersTableTitle from "./components/UsersTableTitle";
import Toolbar from "./components/Toolbar";
import UsersTableBody from "./components/UsersTableBody";
import AppContext from "../../context/app.context.js";
import UserService from "../../services/user.service.js";


const Main = () => {

    let { setUsers } = useContext(AppContext)

    useEffect( () => {
            UserService.getUsers().then(setUsers)
    }, [])


    return(

            <main className="main-container">
                <div className="users-table">
                    <Toolbar/>
                    <UsersTableTitle/>
                    <UsersTableBody/>
                </div>
            </main>
    )
}

export default Main