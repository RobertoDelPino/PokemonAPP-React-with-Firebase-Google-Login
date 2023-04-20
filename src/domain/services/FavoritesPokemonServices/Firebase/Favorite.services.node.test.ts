/**
 *  @jest-environment node
 * */

import {Pokemon} from "../../../models/Pokemon";
import { FavoriteServices } from "./Favorite.services";

describe("updateFavoriteList() should", () => {

    const userId = "irrelevant"
    const pokemon = new Pokemon(1, "", 1, 1, "")
    let favoriteService = new FavoriteServices();

    afterEach(() => {
        jest.restoreAllMocks()
        favoriteService = new FavoriteServices()
    })

    it('call deleteFrom() when pokemon is in the database', async function () {
        favoriteService.getFavorites = jest.fn().mockReturnValue([pokemon])
        favoriteService.existPokemon = jest.fn().mockReturnValue(1)
        favoriteService.deleteFrom = jest.fn()

        await favoriteService.updateFavoriteList(userId, pokemon)

        expect(favoriteService.deleteFrom).toHaveBeenCalled()
    });

    it('call addTo() when pokemon is not in the database', async function () {
        favoriteService.getFavorites = jest.fn().mockReturnValue([pokemon])
        favoriteService.existPokemon = jest.fn().mockReturnValue(false)
        favoriteService.addTo = jest.fn()

        await favoriteService.updateFavoriteList(userId, pokemon)

        expect(favoriteService.addTo).toHaveBeenCalled()
    });

    it('call addTo() when favorite list is empty', async function () {
        favoriteService.getFavorites = jest.fn().mockReturnValue([])
        favoriteService.addTo = jest.fn()

        await favoriteService.updateFavoriteList(userId, pokemon)

        expect(favoriteService.addTo).toHaveBeenCalled()
    });
})

describe("findIndexPokemonInFavoriteList should", () => {

    let userId = "irrelevant";
    let pokemon: Pokemon = new Pokemon(2, "", 1, 1, "")
    let favoriteService = new FavoriteServices();

    afterEach(() => {
        jest.restoreAllMocks()
        favoriteService = new FavoriteServices()
    })

    it('return -1 when pokemon not in the list', async function () {
        favoriteService.getFavorites = jest.fn().mockReturnValue([])

        const pokemonExist = favoriteService.existPokemon(await favoriteService.getFavorites(userId), pokemon)

        expect(pokemonExist).toBe(false)
    });

    it('not return -1 when pokemon is in the database', async function () {
        favoriteService.getFavorites = jest.fn().mockReturnValue([pokemon])

        const pokemonExist = favoriteService.existPokemon(await favoriteService.getFavorites(userId), pokemon)

        expect(pokemonExist).not.toBe(false)
    });

})

describe("getFavorites should", () => {

    let userId = "irrelevant";
    let favoriteService = new FavoriteServices();

    afterEach(() => {
        jest.restoreAllMocks()
        favoriteService = new FavoriteServices()
    })

    it('return empty list when no pokemon in the database', async function () {
        favoriteService.api.getFromDB = jest.fn().mockReturnValue([])

        const favorites = await favoriteService.getFavorites(userId)

        expect(favorites.length).toBe(0)
    });

    it('return non empty list when there are pokemons in the database', async function () {
        const pokemon = new Pokemon(2, "", 1, 1, "")

        favoriteService.api.getFromDB = jest.fn().mockReturnValue([pokemon, pokemon])
        const favorites = await favoriteService.getFavorites(userId)

        expect(favorites.length).not.toBe(0)
    });
})

