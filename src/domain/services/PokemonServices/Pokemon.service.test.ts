import { pokemonApi } from "../../../infrastructure/api/pokemon.api"
import { Pokemon } from "../../models/Pokemon"
import {pokemonService} from "./Pokemon.service";

describe('getPokemonList should', () => {
    it('return a list of pokemons', async () => {

        const pokemonListResult: Pokemon[] = []

        for (let index = 0; index < 20; index++) {
            pokemonListResult.push(new Pokemon(1,"algo", 1,1, ""))
        }

        pokemonApi.getPokemonList = jest.fn().mockReturnValue(pokemonListResult) 

        const pokemonList = await pokemonService.getPokemonList()
        expect(pokemonList.length).toBe(20)
    })
})

describe('getPokemonById should', () => {
    it('return a pokemon', async () => {

        const expectedResult: Pokemon = new Pokemon(1, "3", 1,2,"algo")
        pokemonApi.getPokemonById = jest.fn().mockReturnValue(expectedResult)

        const pokemon: Pokemon = await pokemonService.getPokemonById(1)
        expect(pokemon).toBeInstanceOf(Pokemon)
        expect(pokemon).toBeTruthy()
    })
})