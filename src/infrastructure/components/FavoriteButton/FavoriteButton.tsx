import * as React from 'react'
import {FavoritesPokemonServices} from "../../../domain/services/FavoritesPokemonServices/LocalStorage/FavoritesPokemon.services";
import {Pokemon} from "../../../domain/models/Pokemon";
import {useEffect, useState} from "react";
import {FavoriteServices} from "../../../domain/services/FavoritesPokemonServices/Firebase/Favorite.services";

export function FavoriteButton (props: { pokemon: Pokemon, userId: any}): JSX.Element{

    const firebaseFavoritesPokemon = new FavoriteServices()

    const { pokemon, userId } = props

    const [textButton, setTextButton] = useState("")
    const [colorButton, setColorButton] = useState("")

    function setDeleteFromFavorites(){
        setTextButton("Eliminar de favoritos")
        setColorButton("red")
    }

    function setAddToFavorites(){
        setTextButton("Añadir a favoritos")
        setColorButton("green")
    }

    function changeButtonProperties(){
        textButton == "Añadir a favoritos" ? setDeleteFromFavorites() : setAddToFavorites()
    }

    async function setInitialButtonProperties(){
        const indexPokemon = firebaseFavoritesPokemon.findIndexPokemonInFavoriteList(await firebaseFavoritesPokemon.getFavorites(userId), pokemon)
        indexPokemon != -1 ? setDeleteFromFavorites() : setAddToFavorites()
    }

    useEffect(() => {
        setInitialButtonProperties().then(r => {})
    }, [])

    async function handleClick() {
        await firebaseFavoritesPokemon.setFavoritesPokemon(userId, pokemon)
        changeButtonProperties()
    }

    return (
        <button className={colorButton} onClick={handleClick}>{textButton}</button>
    )
}