import {Pokemon} from "../../../models/Pokemon";
import {FavoritesPokemonDTO} from "../../../../infrastructure/DTO/FavoritesPokemonDTO";

export const FavoritesPokemonServices = {


    getFavoritesPokemon: (): Pokemon[] => {
        // const data: FavoritesPokemonDTO[] = JSON.parse(localStorage.getItem("favorites") || "[]")

        const data: FavoritesPokemonDTO[] = JSON.parse(localStorage.getItem("favorites") || "")

        if(data.length != 0){
            return data.map(({id, name, urlImage, height, weight}) => new Pokemon(Number(id), name, Number(height), Number(weight), urlImage))
        }
        return []
    },
    /*
    *
    * Casos de uso ->
    *   1. If pokemon is not on the list, push pokemon to the array --> Done
    *   2. If pokemon is repeated, delete pokemon from the array --> Done
    */
    setFavoritesPokemon: (pokemon: Pokemon) => {
        const favoritePokemonList: Pokemon[] = FavoritesPokemonServices.getFavoritesPokemon()
        const indexPokemon = FavoritesPokemonServices.findIndexPokemonInFavoriteList(favoritePokemonList, pokemon)
        if (indexPokemon != -1) {
            FavoritesPokemonServices.deletePokemonFromFavoritePokemonList(favoritePokemonList, indexPokemon)
            return
        }
        FavoritesPokemonServices.addPokemonToFavoritePokemonList(favoritePokemonList, pokemon)
    },


    findIndexPokemonInFavoriteList: (favoritePokemonList: Pokemon[], pokemon: Pokemon) => {
        return favoritePokemonList.findIndex(({id}) => pokemon.id == id);
    },

    deletePokemonFromFavoritePokemonList: (favoritePokemonList: Pokemon[], indexPokemon: number) => {
        favoritePokemonList.splice(indexPokemon, 1)
        localStorage.setItem("favorites", JSON.stringify(favoritePokemonList))
    },

    addPokemonToFavoritePokemonList: (favoritePokemonList: Pokemon[], pokemon: Pokemon) => {
        favoritePokemonList.push(pokemon)
        localStorage.setItem("favorites", JSON.stringify(favoritePokemonList))
    }
}