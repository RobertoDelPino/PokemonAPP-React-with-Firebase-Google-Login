import './App.css'
import {BrowserRouter as Switch, Router, Routes, Route, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';
import {PokemonPage} from "./pages/PokemonPage/PokemonPage";
import {Login} from "./pages/LoginPage/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {LoginApi, auth} from "./api/Firebase/Login.api";
import {FavoritePage} from "./pages/FavoritePage/FavoritePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {Header} from "./components/Header/Header";

export function App() {
    const loginAPI = new LoginApi()
    const [user, loading, error] = useAuthState(auth)

  return (
    <div className="App">
        <BrowserRouter>

            <Header userId={user?.uid} />
            <Routes>
                {/*<Route path="/Pokemon/" element={
                    <ProtectedRoute user={user}>
                        <PokemonPage userId={user?.uid} />
                    </ProtectedRoute>
                }/>
                <Route path="/Pokemon/Favorites" element={
                    <ProtectedRoute user={user}>
                        <FavoritePage userId={user?.uid}/>
                    </ProtectedRoute>
                }/>
                <Route path="/LoginPage" element={

                    <ProtectedRoute user={user}>
                        <LoginPage user={user} />
                    </ProtectedRoute>
                }/>*/}
                <Route element={ <ProtectedRoute user={user}/>}>
                    <Route path="/Pokemon/" element={ <PokemonPage userId={user?.uid} />}/>
                    <Route path="/Pokemon/Favorites" element={<FavoritePage userId={user?.uid}/>}/>
                </Route>

                <Route path="/Login" element={<Login user={user} />}/>
                {/* Forma de obligar a que si se encuentra en una ruta que no esté anteriormente
                    definida. Se redirija a otro lugar
                 */}
                <Route path='*' element={<Navigate to='/pokemon' replace />} />
            </Routes>
        </BrowserRouter>

    </div>
  )
}

