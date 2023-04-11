import { Pokemon } from "../../domain/models/Pokemon";
import { PokemonListDTO } from "../DTO/PokemonListDTO";

export const pokemonApi = {
    getPokemonList: async (): Promise<Pokemon[]> => {
        const url = "http://127.0.0.1:3000/api/pokemon";
        const response = await fetch(url);
        const data: PokemonListDTO = await response.json();
        
        return data.PokemonList
    },

    getPokemonById: (): Pokemon => {
        throw new Error("Not implemented yet")
    }
}

