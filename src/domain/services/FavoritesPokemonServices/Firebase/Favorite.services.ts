import {Pokemon} from "../../../models/Pokemon";
import {FavoritesPokemonDTO} from "../../../../infrastructure/DTO/FavoritesPokemonDTO";
import {FavoritePokemonApi} from "../../../../infrastructure/api/Firebase/FavoritePokemon.api";

export class FavoriteServices {

    api = new FavoritePokemonApi()

     async getFavorites(userId: string): Promise<Pokemon[]>{
        const data: FavoritesPokemonDTO[] = await this.api.getFromDB(userId);

        return data.length != 0 ? data.map((pokemon: Pokemon) => pokemon) : []
    }

     async updateFavoriteList(userId: string, pokemon: Pokemon){
        const favoritePokemonList: Pokemon[] = await this.getFavorites(userId)

        if(favoritePokemonList.length == 0){
            this.addTo(userId, pokemon)
        }

        let pokemonExist = this.existPokemon(favoritePokemonList, pokemon)
         pokemonExist ? this.deleteFrom(userId, favoritePokemonList, pokemon.id) : this.addTo(userId, pokemon)
    }

    existPokemon(favoritePokemonList: Pokemon[], pokemon: Pokemon): boolean{
        return favoritePokemonList.some(({id}) => pokemon.id == id);
    }

     deleteFrom(userId: string, favoritePokemonList: Pokemon[], pokemonId: number) {
        const indexPokemon = favoritePokemonList.findIndex(({id}) => pokemonId == id)
        favoritePokemonList.splice(indexPokemon, 1)
        this.api.updateDB(userId, favoritePokemonList).then(r => {})
    }

    addTo(userId: string, pokemon: Pokemon){
        this.api.addToDB(userId, pokemon).then(r => {})
    }
}