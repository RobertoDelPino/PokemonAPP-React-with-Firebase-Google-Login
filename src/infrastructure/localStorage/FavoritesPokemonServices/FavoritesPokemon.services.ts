import {Pokemon} from "../../../domain/models/Pokemon";
import {FavoritesPokemonDTO} from "../../DTO/FavoritesPokemonDTO";

export const FavoritesPokemonServices = {
    /*
    *  Casos de uso ->
    *   1. LocalStorage.getItem should be called 1
    *   2. It returns a list of Pokemons when there is data on LS
    *   3. It returns an empty list when no data is on LS
    * */
    
    getFavoritesPokemon: (): Pokemon[] => {
        const data: FavoritesPokemonDTO[] = JSON.parse(localStorage.getItem("favorites") || "[]")
        if(data.length != 0){
            return data.map(({id, name, urlImage, height, weight}) => new Pokemon(Number(id), name, Number(height), Number(weight), urlImage))
        }
        return []
    },

    /*
    *
    * Casos de uso ->
    *   1. If pokemon is null or undefined throw error
    *   2. If pokemon is not on the list, push pokemon to the array
    *   3. If pokemon is repeated, delete pokemon from the array
    */
    setFavoritesPokemon: (pokemon: Pokemon) => {
        const pokemonList: Pokemon[] = FavoritesPokemonServices.getFavoritesPokemon()
        const indexPokemon = pokemonList.findIndex(({id}) => pokemon.id == id);
        if(indexPokemon != -1){
            pokemonList.splice(indexPokemon, 1)
            localStorage.setItem("favorites", JSON.stringify(pokemonList))
            return
        }

        pokemonList.push(pokemon)
        localStorage.setItem("favorites",JSON.stringify(pokemonList))
    }
}