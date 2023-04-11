import * as React from 'react'

import { Pokemon } from '../../domain/models/Pokemon'
import './pokemonList.css';
import {pokemonService} from "../../domain/services/PokemonServices/Pokemon.service";
import {useState} from "react";

export const PokemonList: () => JSX.Element = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [pokemonList, setPokemonList] = React.useState<Pokemon[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            const data: Pokemon[] = await pokemonService.getPokemonList();
            setPokemonList( data )
            setIsLoading(false)
            console.log()
        }
        fetchData()
    }, [])

    if(isLoading){
        return <p>Cargando...</p>
    }

    return (

        <section className="contenedor">
            {pokemonList.map((pokemon: Pokemon) => (
                <div key={pokemon.id}>
                    <img src={pokemon.urlImage} width={100}/>
                    <h2>{pokemon.name}</h2>
                    <p>Peso: {pokemon.weight}</p>
                    <p>Altura: {pokemon.height}</p>
                    <button>Agregar a favoritos</button>{/*Esto debería de ser otro componente*/}
                </div>
            ))}
        </section>
    )
}