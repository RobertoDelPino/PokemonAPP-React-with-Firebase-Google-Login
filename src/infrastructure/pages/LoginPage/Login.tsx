import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoginApi} from "../../api/Firebase/Login.api";
import styles from "./Login.module.css"
import eevee from "../../../assets/eevee.png"
import {useUser} from "../../hooks/useUser";

export function Login(){

    let login = new LoginApi()
    const navigate = useNavigate()

    const userId =  useUser()

    useEffect(() => {
        if(userId) navigate("/pokemon")
    }, [userId])

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

