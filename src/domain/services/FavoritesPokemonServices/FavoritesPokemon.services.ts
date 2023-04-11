import {Pokemon} from "../../models/Pokemon";

export const FavoritesPokemonServices = {
    /*
    *  Casos de uso ->
    *   1. LocalStorage.getItem should be called 1
    *   2. It return a list of Pokemons when there is data on LS
    *   3. It return null when no data is on LS
    * */
    getFavoritesPokemon: () => {
        throw new Error("Not implemented yet")
    },

    /*
    *
    * Casos de uso ->
    *   1. If pokemon is null or undefined throw error
    *   2. If pokemon is not on the list, push pokemon to the array
    *   3. If pokemon is repeated, delete pokemon from the array
    */
    setFavoritesPokemon: (pokemon: Pokemon) => {
        localStorage.setItem("favorites",JSON.stringify(pokemon))
    }
}