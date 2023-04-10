import { pokemonRepository } from "../../infrastructure/repositories/pokemon.repository"
import { Pokemon } from "../models/Pokemon";

export const pokemonService = {
    getPokemon: async (): Promise<Pokemon[]> => {
        const pokemonList: Pokemon[] = await pokemonRepository.getPokemonList()
        return pokemonList;
    }
}
