import { Pokemon } from "../../domain/models/Pokemon";
import { PokemonListDTO } from "../DTO/PokemonListDTO";

export const pokemonApi = {
    getPokemonList: async (): Promise<Pokemon[]> => {
        // Aqui se hace la llamada a la API
        // Cuando se haga la llamada se ha de recibir el DTO y se transforma
        
        const url = "http://127.0.0.1:3000/api/pokemon";
        const response = await fetch(url);
        const data: PokemonListDTO = await response.json();
        
        return data.PokemonList
    }
}