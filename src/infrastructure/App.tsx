import './App.css'
import {BrowserRouter as Switch, Router, Routes, Route, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';
import {PokemonPage} from "./pages/PokemonPage/PokemonPage";
import {Login} from "./pages/LoginPage/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {LoginApi, auth} from "./api/Firebase/Login.api";
import {FavoritePage} from "./pages/FavoritePage/FavoritePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {Header} from "./components/Header/Header";
import {UserProvider} from "./context/UserProvider";

export function App() {
    const loginAPI = new LoginApi()
    // const [user, loading, error] = useAuthState(auth)

  return (
    <div className="App">
        <BrowserRouter>
            <UserProvider>
                <Header />
                <Routes>
                    <Route element={ <ProtectedRoute/>}>
                        <Route path="/Pokemon/" element={ <PokemonPage />}/>
                        <Route path="/Pokemon/Favorites" element={<FavoritePage/>}/>
                    </Route>

                    <Route path="/Login" element={<Login />}/>
                     {/*Forma de obligar a que si se encuentra en una ruta que no esté anteriormente
                        definida. Se redirija a otro lugar*/}
                    <Route path='*' element={<Navigate to='/pokemon' replace />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>

    </div>
  )
}

