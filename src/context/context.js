import React, {
    useEffect,
    useStat
} from "react";

import api from "../services/api";

export const MyContext = React.createContext({
    userID: null,
    userName: null,
    userType: null,
    eventsRegistered: [],
    eventsCreated: []
});

export const MyProvider = ({ children }) => {

    return (
        <MyContext.Provider
            value={{

            }}>

            {children}

        </MyContext.Provider>

    )
}