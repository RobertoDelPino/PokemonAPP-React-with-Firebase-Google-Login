import {createContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../api/Firebase/Login.api";

export const Usercontext = createContext<string | undefined>(undefined)

export const UserProvider = ({children}) => {

    let [user, loading, error] = useAuthState(auth)

    if(user == undefined){
        user = null
    }

    return (
        <Usercontext.Provider value={
            user?.uid
        }>
            {children}
        </Usercontext.Provider>
    )
}