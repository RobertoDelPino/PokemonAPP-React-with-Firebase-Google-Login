import {useEffect} from "react";
import * as firebase from "../../api/Firebase/Login.api"
import {useNavigate} from "react-router-dom";

export function Login(user){
    const navigate = useNavigate()

    useEffect(() => {
        if(user.user) navigate("/pokemon")
    })

    return (
        <>
            <button onClick={() => firebase.signInWithGoogle()}>Sign in with Google 🚀 </button>
        </>
    )
}

