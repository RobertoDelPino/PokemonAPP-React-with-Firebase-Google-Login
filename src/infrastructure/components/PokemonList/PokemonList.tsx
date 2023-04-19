import * as React from 'react'

import { Pokemon } from '../../../domain/models/Pokemon'
import './pokemonList.css';
import {PokemonService} from "../../../domain/services/PokemonServices/PokemonService";
import {useEffect, useState} from "react";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";
import InfiniteScroll from "react-infinite-scroll-component";
import {Spinner} from "../Spinner/Spinner";
import { useQuery } from '../../hooks/useQuery.jsx'

export const PokemonList: ({userId}: { userId: any }) => (JSX.Element) = ({userId}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [pokemonList, setPokemonList] = React.useState<Pokemon[]>([])
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [maximun, setMaximun] = useState(0);

    const query = useQuery();
    const search = query.get("search")

    const findPokemonByName = async () => {
        const data: Pokemon[] = await PokemonService.getPokemonListByName(search);
        setPokemonList(data)
        setIsLoading(false)
    }

    const fetchPokemonList = async (pokemonList: Pokemon[]) => {
        const data: Pokemon[] = await PokemonService.getPokemonList(offset);
        setPokemonList( [...pokemonList, ...data])
        setIsLoading(false)
        setHasMore(offset < maximun)
    }

    const setMaximunCount = async () => {
        const data = await PokemonService.getPokemonCount()
        setMaximun(Number(data.count))
    }

    useEffect(() => {
        setMaximunCount()
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if(search == null || search == ""){
            setHasMore(true)
            setOffset(0)
            fetchPokemonList([])
        }
        else{
            setHasMore(false)
            findPokemonByName()
        }
    }, [search])

    useEffect(() => {
        fetchPokemonList(pokemonList)
    }, [offset])

    if(isLoading){
        return <p>Cargando...</p>
    }

    return (
        <InfiniteScroll
            dataLength={pokemonList.length}
            hasMore={hasMore}
            next={() => setOffset((prevOffset) => prevOffset + 20)}
            loader={<Spinner/>}
        >
            <section className="contenedor">
                {
                    pokemonList.map((pokemon: Pokemon) => (
                        <article key={pokemon.id}>
                            <img src={pokemon.urlImage} width={100}/>
                            <h2>{pokemon.name}</h2>
                            <p>Peso: {pokemon.weight}</p>
                            <p>Altura: {pokemon.height}</p>
                            <FavoriteButton key={pokemon.id} pokemon={pokemon} userId={userId}/>
                        </article>
                    ))
                }

            </section>
        </InfiniteScroll>
    )
}