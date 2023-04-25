import * as React from 'react'
import {PokemonList} from "../../components/PokemonList/PokemonList";
import {Search} from "../../components/Search/Search"
import {useUser} from "../../hooks/useUser";

export function PokemonPage (): JSX.Element{

    const userIdd = useUser()

    return (
        <>
            <Search/>
            <PokemonList userId={userIdd}/>
        </>
    )
}