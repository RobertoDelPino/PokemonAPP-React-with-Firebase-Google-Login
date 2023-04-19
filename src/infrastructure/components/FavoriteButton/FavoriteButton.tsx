import * as React from 'react'
import {FavoritesPokemonServices} from "../../../domain/services/FavoritesPokemonServices/FavoritesPokemon.services";
import {Pokemon} from "../../../domain/models/Pokemon";
import {useEffect, useState} from "react";
import {FavoritePokemon} from "../../api/Firebase/FavoritePokemon";

export function FavoriteButton (props: { pokemon: Pokemon, userId: any}): JSX.Element{

    const FIREBASE = new FavoritePokemon()

    const { pokemon, userId } = props

    const [textButton, setTextButton] = useState("")
    const [colorButton, setColorButton] = useState("")

    function changeButtonProperties(){
        if(FavoritesPokemonServices.findIndexPokemonInFavoriteList(FavoritesPokemonServices.getFavoritesPokemon(),pokemon) != -1){
            setTextButton("Eliminar de favoritos")
            setColorButton("red")
        }
        else{
            setTextButton("Añadir a favoritos")
            setColorButton("green")
        }
    }

    useEffect(() => {
        changeButtonProperties()
    }, [])

    function handleClick() {
        FIREBASE.addToDB(userId, pokemon).then(r => {})
        FavoritesPokemonServices.setFavoritesPokemon(pokemon)
        changeButtonProperties()
    }

    return (
        <button className={colorButton} onClick={handleClick}>{textButton}</button>
    )
}