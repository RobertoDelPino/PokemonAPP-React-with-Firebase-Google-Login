import React, {useEffect, useState} from 'react';
import { LoginApi } from "../../api/Firebase/Login.api";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./Header.module.css"

export function Header({userId}) {

    const [path, setPath] = useState("")
    const [textButton, setTextButton ] = useState("")
    const loginAPI = new LoginApi()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname){
            case "/pokemon": { setPath("/pokemon/favorites"); setTextButton("Mostrar Pokemons Favoritos") } break;
            case "/pokemon/favorites": { setPath("/pokemon"); setTextButton("Mostrar pokemons") } break;
        }
    }, [location.pathname])

    if (location.pathname == "/login"){
        return <></>
    }

    return (
        <>
            <header className={styles.header}>
                { userId ?
                    <>
                        <button className={`${styles.middle} ${styles.button}`} onClick={() => navigate(path)}>{textButton}</button>
                        <button className={`${styles.right} ${styles.button}`} onClick={loginAPI.logout}>Log Out</button>
                    </> : <button onClick={loginAPI.signInWithGoogle}>Log In</button>
                }
            </header>
        </>
    );
}