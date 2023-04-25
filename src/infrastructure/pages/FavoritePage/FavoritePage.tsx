import * as React from 'react'
import {useEffect, useState} from "react";
import {Pokemon} from "../../../domain/models/Pokemon";
import {FavoritePokemonApi} from "../../api/Firebase/FavoritePokemon.api";
import {FavoriteButton} from "../../components/FavoriteButton/FavoriteButton";
import {useUser} from "../../hooks/useUser";

export function FavoritePage (): JSX.Element{

    const userId = useUser()

    if(!userId){
        return <></>
    }

    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const firebase = new FavoritePokemonApi()
            const pokemonListDB = await firebase.getFromDB(userId)
            setPokemonList(pokemonListDB)
        }

        fetchData()
    },[])

    if(pokemonList.length == 0){
        return ( <h2 style={{textAlign: "center"}}>No tienes ningún pokemon agregado a favoritos</h2> )
    }

    return (
        <>
            <section className="contenedor">
                {
                    pokemonList.map((pokemon: Pokemon) => (
                        <article key={pokemon.id}>
                            <img alt={""} src={pokemon.urlImage} width={100}/>
                            <h2>{pokemon.name}</h2>
                            <p>Peso: {pokemon.weight}</p>
                            <p>Altura: {pokemon.height}</p>
                            <FavoriteButton pokemon={pokemon} userId={userId}></FavoriteButton>
                        </article>
                    ))
                }

            </section>
        </>
    )
}