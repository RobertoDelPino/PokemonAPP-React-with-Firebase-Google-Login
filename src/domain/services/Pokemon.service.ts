import { pokemonApi } from "../../infrastructure/api/pokemon.api"
import { Pokemon } from "../models/Pokemon";

export const pokemonService = {
    getPokemon: async (): Promise<Pokemon[]> => {
        const pokemonList: Pokemon[] = await pokemonApi.getPokemonList()
        return pokemonList;
    }
}
