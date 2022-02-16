import React, {createContext} from "react";

const AppContext = createContext({
    users: [],
    setUsers: () => {},
    isAuthorized: false,
    setIsAuthorized: () => {},
    currentUser: {},
    setCurrentUser: () => {}
})

export default AppContext
