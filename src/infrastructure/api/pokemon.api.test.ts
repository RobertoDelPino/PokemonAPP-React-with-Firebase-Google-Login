import {pokemonApi} from './pokemon.api'


describe("/GET pokemonApi should", () => {
    it("return a list of pokemon", async () => {
        const pokemonList = await pokemonApi.getPokemonList();

        expect(pokemonList.length).toBe(20)
    })
})