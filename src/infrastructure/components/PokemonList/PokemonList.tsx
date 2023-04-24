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
    const [maximum, setMaximum] = useState(1000);

    const query = useQuery();
    const search = query.get("search")

    const findPokemonByName = async () => {
        const data: Pokemon[] = await PokemonService.getListByName(search);
        setPokemonList(data)
        setIsLoading(false)
    }

    const fetchPokemonList = async (pokemonList: Pokemon[]) => {
        const data: Pokemon[] = await PokemonService.getList(offset);
        setPokemonList( [...pokemonList, ...data])
        setIsLoading(false)
        setHasMore(offset < maximum)
    }

    const setMaximumCount = async () => {
        const data = await PokemonService.getListCount()
        setMaximum(Number(data.count))
    }

    useEffect(() => {
        const algo = async () => {
            await setMaximumCount()
        }
        algo().then(r => {})
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if(search == null || search == ""){
            setHasMore(true)
            setOffset(0)
            fetchPokemonList([]).then(r => {})
        }
        else{
            setHasMore(false)
            findPokemonByName().then(r => {})
        }
    }, [search])

    useEffect(() => {
        const algo = async () => {
            await fetchPokemonList(pokemonList)
        }
        algo().then(r => {})
    }, [offset])

    if(isLoading){
        return <h2 style={{textAlign: "center"}}>Cargando...</h2>
    }

    if(pokemonList.length == 0){
        return <h2 style={{textAlign: "center"}}>No se han encontrado pokemons</h2>
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