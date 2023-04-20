import React from 'react';
import * as firebase from "../../api/Firebase/Login.api";

export function Header(props) {

    const {userId} = props
    return (
        <>
            <header>
                { userId ?
                    <button onClick={firebase.logout}>Log Out</button>
                        : <button onClick={firebase.logout}>Log In</button>
                }
            </header>
        </>
    );
}