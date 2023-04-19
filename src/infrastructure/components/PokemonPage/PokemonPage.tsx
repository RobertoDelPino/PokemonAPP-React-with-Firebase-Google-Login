import * as React from 'react'
import {PokemonList} from "../PokemonList/PokemonList";
import {Search} from "../Search/Search"
import {useNavigate} from "react-router-dom";
import * as firebase from "../../api/Firebase/Login.api"

export function PokemonPage ({userId}): JSX.Element{
    const navigate = useNavigate()

    return (
        <>
            <button onClick={firebase.logout}>Log Out</button>
            <button onClick={() => {navigate("/pokemon/favorites")}}>Mostrar Pokemons favoritos</button>
            <Search/>
            <PokemonList userId={userId}/>
        </>
    )
}