import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {PokemonPage} from "./components/PokemonPage/PokemonPage";
import {Login} from "./components/Login/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./api/Firebase/Login.api";
import {FavoritePage} from "./components/FavoritePage/FavoritePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export function App() {
    const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
        <Router>
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
                <Route path="/Login" element={

                    <ProtectedRoute user={user}>
                        <Login user={user} />
                    </ProtectedRoute>
                }/>*/}
                <Route element={ <ProtectedRoute user={user}/>}>
                    <Route path="/Pokemon/" element={ <PokemonPage userId={user?.uid} />}/>
                    <Route path="/Pokemon/Favorites" element={<FavoritePage userId={user?.uid}/>}/>
                </Route>

                <Route path="/Login" element={<Login user={user} />}/>

            </Routes>
        </Router>

    </div>
  )
}

