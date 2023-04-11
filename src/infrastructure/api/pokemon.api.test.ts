import {pokemonApi} from './pokemon.api'
import {Pokemon} from "../../domain/models/Pokemon";


describe("/GET getPokemonList should", () => {
    it("return a list of pokemon", async () => {
        const pokemonList = await pokemonApi.getPokemonList();

        expect(pokemonList.length).toBe(20)
    })
})

describe("/GET getPokemonById should", () => {
    it("return a pokemon", async () => {
        const pokemonList = await pokemonApi.getPokemonById(1);

        expect(pokemonList).toBeTruthy()
        expect(pokemonList).toBeInstanceOf(Pokemon)
    })
})