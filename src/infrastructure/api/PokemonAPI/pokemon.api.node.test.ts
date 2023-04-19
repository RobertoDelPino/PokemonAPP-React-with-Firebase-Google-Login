/**
*  @jest-environment node
* */

import {PokemonApi} from './pokemonApi'
import {Pokemon} from "../../../domain/models/Pokemon";


describe("/GET getPokemonList should", () => {

    it("return a list of pokemon", async () => {
        let pokemonAPI: PokemonApi = new PokemonApi()
        const pokemonList = await pokemonAPI.getPokemonList();

        expect(pokemonList[0]).toBeInstanceOf(Pokemon)
        expect(pokemonList.length).toBe(20)
    })
})

describe("/GET getPokemonById should", () => {

    it("return a pokemon", async () => {
        let pokemonAPI: PokemonApi = new PokemonApi()
        const pokemon = await pokemonAPI.getPokemonById(1)

        expect(pokemon).toBeTruthy()
        expect(pokemon).toBeInstanceOf(Pokemon)
    })
})