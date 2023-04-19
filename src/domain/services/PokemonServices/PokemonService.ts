import { PokemonApi } from "../../../infrastructure/api/PokemonAPI/pokemonApi"
import { Pokemon } from "../../models/Pokemon";
import {CountDTO} from "../../../infrastructure/DTO/CountDTO";

export const PokemonService = {

    POKEMON_API: new PokemonApi(),

    getPokemonList: async (offset:number = 0): Promise<Pokemon[]> => {
        const pokemonList: Pokemon[] = await PokemonService.POKEMON_API.getPokemonList(offset)
        return pokemonList;
    },

    getPokemonById: async (id: number): Promise<Pokemon> => {
        const pokemon: Pokemon = await PokemonService.POKEMON_API.getPokemonById(1)
        return pokemon
    },

    getPokemonListByName: async (name: string) => {
        const pokemon: Pokemon[] = await PokemonService.POKEMON_API.getPokemonListByName(name)
        return pokemon
    },

    getPokemonCount: async () => {
        const count: CountDTO = await PokemonService.POKEMON_API.getAllPokemonCount()
        return count
    }
}
