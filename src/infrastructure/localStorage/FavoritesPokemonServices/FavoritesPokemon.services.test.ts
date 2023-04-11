/*
    * setFavoritesPokemon()
    * Casos de uso ->
    *   1. If pokemon is null or undefined throw error
    *   2. If pokemon is not on the list, push pokemon to the array --> done
    *   3. If pokemon is repeated, delete pokemon from the array --> done
*/

import {FavoritesPokemonServices} from "./FavoritesPokemon.services";
import {Pokemon} from "../../../domain/models/Pokemon";

describe(("setFavoritesPokemon should"), () => {

    beforeEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

     it('save a pokemon in the list', function () {
         const pokemon = new Pokemon(1, "algo", 1, 1, "")

         const spy = jest.spyOn(Storage.prototype, 'setItem');
         FavoritesPokemonServices.setFavoritesPokemon(pokemon)
         expect(spy).toHaveBeenCalled()
    });

    it('delete pokemon if it is on the list', function () {
        const pokemon = new Pokemon(1, "algo", 1, 1, "")

        FavoritesPokemonServices.setFavoritesPokemon(pokemon)
        FavoritesPokemonServices.setFavoritesPokemon(pokemon)

        const list = FavoritesPokemonServices.getFavoritesPokemon()
        expect(list.length).toBe(0)
    });

    it('add pokemon if it is not on the list', function () {
        const pokemon = new Pokemon(1, "algo", 1, 1, "")

        FavoritesPokemonServices.setFavoritesPokemon(pokemon)

        const list = FavoritesPokemonServices.getFavoritesPokemon()
        expect(list.length).toBe(1)
    });
})

/*
    *  Uses Cases ->
    *   1. It returns a list of Pokemons when there is data on LS --> Done
    *   2. It returns an empty list when no data is on LS --> Done
*/

describe("getFavoritesPokemon should", () => {
    it('return a list of Pokemon', function () {
        FavoritesPokemonServices.setFavoritesPokemon(new Pokemon(1, "", 2, 3, ""))

        const pokemons = FavoritesPokemonServices.getFavoritesPokemon()
        expect(pokemons.length).toBe(1)
    });

    it('return an empty null', function () {
        const pokemons = FavoritesPokemonServices.getFavoritesPokemon()
        expect(pokemons.length).toBe(0)
    });
})

