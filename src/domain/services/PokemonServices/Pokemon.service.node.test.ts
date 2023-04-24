/**
 * @jest-environment node
 */

import { PokemonApi } from "../../../infrastructure/api/PokemonAPI/pokemonApi"
import { Pokemon } from "../../models/Pokemon"
import {PokemonService} from "./PokemonService";

/*global.fetch = require('jest-fetch-mock');*/

/*global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ algo: "algo"}),
    })
);*/

describe('getPokemonList should', () => {
    it('return a list of pokemons', async () => {

        const pokemonAPI = new PokemonApi()
        const pokemonListResult: Pokemon[] = []

        for (let index = 0; index < 20; index++) {
            pokemonListResult.push(new Pokemon(1,"algo", 1,1, ""))
        }

        pokemonAPI.getPokemonList = jest.fn().mockReturnValue(pokemonListResult)

        const pokemonList = await PokemonService.getList()
        expect(pokemonList.length).toBe(20)
    })
})

describe('getPokemonById should', () => {
    it('return a pokemon', async () => {
        const pokemonAPI = new PokemonApi()
        const expectedResult: Pokemon = new Pokemon(1, "3", 1,2,"algo")
        pokemonAPI.getPokemonById = jest.fn().mockReturnValue(expectedResult)

        const pokemon: Pokemon = await PokemonService.getById(1)
        expect(pokemon).toBeInstanceOf(Pokemon)
        expect(pokemon).toBeTruthy()
    })
})