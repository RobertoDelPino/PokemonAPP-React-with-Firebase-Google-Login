/**
 *  @jest-environment node
 * */

import {Pokemon} from "../../../models/Pokemon";
import { FavoriteServices } from "./Favorite.services";

describe("SetFavoritesPokemon should", () => {

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('call deleteFrom() when pokemon is in the database', async function () {
        const userId = "bla"
        const pokemon = new Pokemon(1, "", 1, 1, "")

        const favoriteService = new FavoriteServices()
        favoriteService.getFavorites = jest.fn().mockReturnValue([pokemon])
        favoriteService.findIndexPokemonInFavoriteList = jest.fn().mockReturnValue(1)
        favoriteService.deleteFrom = jest.fn()

        await favoriteService.setFavoritesPokemon(userId, pokemon)

        expect(favoriteService.deleteFrom).toHaveBeenCalled()
    });

    it('call addTo() when pokemon is not in the database', async function () {
        const userId = "bla"
        const pokemon = new Pokemon(1, "", 1, 1, "")

        const favoriteService = new FavoriteServices()
        favoriteService.getFavorites = jest.fn().mockReturnValue([pokemon])
        favoriteService.findIndexPokemonInFavoriteList = jest.fn().mockReturnValue(-1)
        favoriteService.addTo = jest.fn()

        await favoriteService.setFavoritesPokemon(userId, pokemon)

        expect(favoriteService.addTo).toHaveBeenCalled()
    });

    it('call addTo() when favorite list is empty', async function () {
        const userId = "bla"
        const pokemon = new Pokemon(1, "", 1, 1, "")

        const favoriteService = new FavoriteServices()
        favoriteService.getFavorites = jest.fn().mockReturnValue([])
        favoriteService.addTo = jest.fn()

        await favoriteService.setFavoritesPokemon(userId, pokemon)

        expect(favoriteService.addTo).toHaveBeenCalled()
    });
})



