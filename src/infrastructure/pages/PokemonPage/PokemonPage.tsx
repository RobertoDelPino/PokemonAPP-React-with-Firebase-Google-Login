import * as React from 'react'
import {PokemonList} from "../../components/PokemonList/PokemonList";
import {Search} from "../../components/Search/Search"

export function PokemonPage ({userId}): JSX.Element{

    return (
        <>
            <Search/>
            <PokemonList userId={userId}/>
        </>
    )
}