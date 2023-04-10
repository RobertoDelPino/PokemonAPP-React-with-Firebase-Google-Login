import { pokemonService } from "./pokemon.service"

describe('getPokemonList should', () => {
    it('return a list of pokemons', () => {
        expect(pokemonService.getPokemon().length).toBe(20)
    })
})