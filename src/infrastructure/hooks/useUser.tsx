import {useContext} from "react";
import {Usercontext} from "../context/UserProvider";

export const useUser = () => {
    return useContext(Usercontext)
}