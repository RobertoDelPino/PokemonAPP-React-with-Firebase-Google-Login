import { Pokemon } from "../../domain/models/Pokemon";
import { PokemonListDTO } from "../DTO/PokemonListDTO";
import {PokemonByIdDTO} from "../DTO/PokemonByIdDTO";

export const pokemonApi = {
    commonUrl: "http://127.0.0.1:3000/api/pokemon",

    getPokemonList: async (): Promise<Pokemon[]> => {
        const url = pokemonApi.commonUrl;
        const response = await fetch(url);
        const data: PokemonListDTO = await response.json();
        const pokemonList = data.PokemonList.map(({id, name, height, weight, urlImage}) => new Pokemon(id, name, height, weight, urlImage))


        return pokemonList
    },

    getPokemonById: async (id: number): Promise<Pokemon> => {
        const url = pokemonApi.commonUrl + "/" + id;
        const response = await fetch(url)
        const data: PokemonByIdDTO = await response.json();
        const pokemon = new Pokemon(Number(data.pokemon.id), data.pokemon.name, Number(data.pokemon.height), Number(data.pokemon.weight), data.pokemon.urlImage )
        return pokemon
    }
}

