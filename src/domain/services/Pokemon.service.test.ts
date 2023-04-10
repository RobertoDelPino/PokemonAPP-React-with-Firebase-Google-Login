import { pokemonApi } from "../../infrastructure/api/pokemon.api"
import { Pokemon } from "../models/Pokemon"
import { pokemonService } from "./pokemon.service"

describe('getPokemonList should', () => {
    it('return a list of pokemons', async () => {

        const pokemonListResult: Pokemon[] = []

        for (let index = 0; index < 20; index++) {
            pokemonListResult.push(new Pokemon(1,"algo", 1,1, ""))
        }

        pokemonApi.getPokemonList = jest.fn().mockReturnValue(pokemonListResult) 

        const pokemonList = await pokemonService.getPokemon()
        expect(pokemonList.length).toBe(20)
    })
})