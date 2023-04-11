/*
    * setFavoritesPokemon()
    * Casos de uso ->
    *   1. If pokemon is null or undefined throw error
    *   2. If pokemon is not on the list, push pokemon to the array
    *   3. If pokemon is repeated, delete pokemon from the array
*/

import {FavoritesPokemonServices} from "./FavoritesPokemon.services";
import {Pokemon} from "../../models/Pokemon";

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


})