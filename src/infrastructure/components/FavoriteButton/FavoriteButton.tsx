import * as React from 'react'
import {Pokemon} from "../../../domain/models/Pokemon";
import {useEffect, useState} from "react";
import {FavoriteServices} from "../../../domain/services/FavoritesPokemonServices/Firebase/Favorite.services";

export function FavoriteButton(props: { pokemon: Pokemon, userId: any }): JSX.Element {

    const firebaseFavoritesPokemon = new FavoriteServices()

    const {pokemon, userId} = props

    const [textButton, setTextButton] = useState("")
    const [colorButton, setColorButton] = useState("")

    function setDeleteFromFavorites() {
        setTextButton("Eliminar de favoritos")
        setColorButton("red")
    }

    function setAddToFavorites() {
        setTextButton("Añadir a favoritos")
        setColorButton("green")
    }

    function changeButtonProperties() {
        textButton == "Añadir a favoritos" ? setDeleteFromFavorites() : setAddToFavorites()
    }

    async function setInitialButtonProperties() {
        const indexPokemon = firebaseFavoritesPokemon.existPokemon(await firebaseFavoritesPokemon.getFavorites(userId), pokemon)
        indexPokemon ? setDeleteFromFavorites() : setAddToFavorites()
    }

    useEffect(() => {
        const set = async () => {
            await setInitialButtonProperties()
        }
        set()
    }, [])

    async function handleClick() {
        await firebaseFavoritesPokemon.updateFavoriteList(userId, pokemon)
        changeButtonProperties()
    }

    return (
        <button className={colorButton} onClick={handleClick}>{textButton}</button>
    )
}