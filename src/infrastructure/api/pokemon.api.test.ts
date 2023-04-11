import {pokemonApi} from './pokemon.api'
import {Pokemon} from "../../domain/models/Pokemon";


describe("/GET getPokemonList should", () => {
    it("return a list of pokemon", async () => {
        const pokemonList = await pokemonApi.getPokemonList();

        expect(pokemonList[0]).toBeInstanceOf(Pokemon)
        expect(pokemonList.length).toBe(20)
    })
})

describe("/GET getPokemonById should", () => {
    it("return a pokemon", async () => {
        const pokemon = await pokemonApi.getPokemonById(1);

        expect(pokemon).toBeTruthy()
        expect(pokemon).toBeInstanceOf(Pokemon)
    })
})