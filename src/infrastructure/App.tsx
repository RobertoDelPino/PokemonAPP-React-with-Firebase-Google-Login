import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import {PokemonPage} from "./pages/PokemonPage/PokemonPage";
import {Login} from "./pages/LoginPage/Login";
import {FavoritePage} from "./pages/FavoritePage/FavoritePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {Header} from "./components/Header/Header";
import {UserProvider} from "./context/UserProvider";

export function App() {

  return (
    <div className="App">
        <Router>
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
        </Router>

    </div>
  )
}

