import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../../context/app.context.js";
import {Button} from 'react-bootstrap';

const UsersTableTitle = () => {

    let [select, setSelect] = useState(false)
    const {setUsers} = useContext(AppContext)

    const selectStatus = () => {
        setSelect(!select)
    }

    useEffect(()=>{
        setUsers(prevState=>
            prevState.map(e=>{
                e.isChecked = select
                return e
            })
        )
    }, [select])

    return(
        <div className="table-row">
            <div><Button variant="outline-light" onClick={selectStatus}>{select?'Unselect all':'Select all'}</Button></div>
            <div>Id</div>
            <div>Name</div>
            <div>Email</div>
            <div>Date of registration</div>
            <div>Last login date</div>
            <div>Status</div>
        </div>
    )
}

export default UsersTableTitle