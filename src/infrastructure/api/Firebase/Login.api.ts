import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";
import {getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDo1LuM9uLYHoHnUxbnNGIMjhHdsnZkHPc",
    authDomain: "pokemonprueba-1cdd2.firebaseapp.com",
    projectId: "pokemonprueba-1cdd2",
    storageBucket: "pokemonprueba-1cdd2.appspot.com",
    messagingSenderId: "999997475605",
    appId: "1:999997475605:web:0c04c3e36fe596eb42b71c",
    measurementId: "G-4VXYTZ07MS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider().setCustomParameters({
    prompt: 'select_account'
});

export class LoginApi {

    constructor() {
    }

    async signInWithGoogle() {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            // Si hace la peticion y devuelve algo, lo guarda en la base de datos
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    logout() {
        signOut(auth).then(r => {})
    };
}