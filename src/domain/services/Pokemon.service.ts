import { pokemonApi } from "../../infrastructure/api/pokemon.api"
import { Pokemon } from "../models/Pokemon";

export const pokemonService = {
    getPokemonList: async (): Promise<Pokemon[]> => {
        const pokemonList: Pokemon[] = await pokemonApi.getPokemonList()
        return pokemonList;
    },

    getPokemonById: async (id: number): Promise<Pokemon> => {
        const pokemon: Pokemon = await pokemonApi.getPokemonById()
        return pokemon
    }
}
