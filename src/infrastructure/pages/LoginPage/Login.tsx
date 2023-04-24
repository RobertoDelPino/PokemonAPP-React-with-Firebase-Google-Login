import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoginApi} from "../../api/Firebase/Login.api";
import styles from "./Login.module.css"
import eevee from "../../../assets/eevee.png"

export function Login(user){

    let login = new LoginApi()

    const navigate = useNavigate()

    useEffect(() => {
        if(user.user) navigate("/pokemon")
    })

    return (
        <>
            <section className={styles.center}>
                <h3 className={styles.text}>Iniciar sesión</h3>
                <article className={styles.centerArticle}>
                    <button className={`${styles.middle} ${styles.button}`} onClick={login.signInWithGoogle}>Sign with google</button>
                </article>
                <img className={styles.imagen} src={eevee} alt=""/>
            </section>
        </>
    )
}

