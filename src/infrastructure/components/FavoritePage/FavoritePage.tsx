import * as React from 'react'
import * as firebase from "../../api/Firebase/Login.api"
import {useEffect, useState} from "react";
import {Pokemon} from "../../../domain/models/Pokemon";
import {FavoritePokemonApi} from "../../api/Firebase/FavoritePokemon.api";

export function FavoritePage ({userId}): JSX.Element{

    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const firebase = new FavoritePokemonApi()
            const pokemonListDB = await firebase.getFromDB(userId)
            setPokemonList(pokemonListDB)
        }

        fetchData()
    },[])

    return (
        <>
            <button onClick={firebase.logout}>Log Out</button>
            <section className="contenedor">
                {
                    pokemonList.map((pokemon: Pokemon) => (
                        <article key={pokemon.id}>
                            <img src={pokemon.urlImage} width={100}/>
                            <h2>{pokemon.name}</h2>
                            <p>Peso: {pokemon.weight}</p>
                            <p>Altura: {pokemon.height}</p>
                        </article>
                    ))
                }

            </section>
        </>
    )
}