import {Pokemon} from "../../../models/Pokemon";
import {FavoritesPokemonDTO} from "../../../../infrastructure/DTO/FavoritesPokemonDTO";
import {FavoritePokemonApi} from "../../../../infrastructure/api/Firebase/FavoritePokemon.api";

export class FavoriteServices {

    private FAVORITE_POKEMON_API = new FavoritePokemonApi()

     async getFavorites(userId: string): Promise<Pokemon[]>{

        const data: FavoritesPokemonDTO[] = await this.FAVORITE_POKEMON_API.getFromDB(userId)

        if(data.length != 0){
            return data.map((pokemon: Pokemon) => pokemon)
        }

        return []
    }

     async setFavoritesPokemon(userId: string, pokemon: Pokemon){
        const favoritePokemonList: Pokemon[] = await this.getFavorites(userId)

        if(favoritePokemonList.length == 0){
            this.addTo(userId, pokemon)
        }

        let indexPokemon = this.findIndexPokemonInFavoriteList(favoritePokemonList, pokemon)
        if (indexPokemon != -1) {
            console.log(indexPokemon)
            this.deleteFrom(userId, favoritePokemonList, indexPokemon)
        }
        else{
            this.addTo(userId, pokemon)
        }
    }

    findIndexPokemonInFavoriteList(favoritePokemonList: Pokemon[], pokemon: Pokemon): number{
        return favoritePokemonList.findIndex(({id}) => pokemon.id == id);
    }

     deleteFrom(userId: string, favoritePokemonList: Pokemon[], indexPokemon: number) {
        favoritePokemonList.splice(indexPokemon, 1)
        this.FAVORITE_POKEMON_API.updateDB(userId, favoritePokemonList).then(r => {})
    }

    addTo(userId: string, pokemon: Pokemon){
        this.FAVORITE_POKEMON_API.addToDB(userId, pokemon).then(r => {})
    }
}