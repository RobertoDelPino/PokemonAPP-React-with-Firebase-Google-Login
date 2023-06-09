import {prettyDOM, screen, render} from "@testing-library/react";
import {FavoriteButton} from "./FavoriteButton";
import {Pokemon} from "../../../domain/models/Pokemon";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import {FavoriteServices} from "../../../domain/services/FavoritesPokemonServices/Firebase/Favorite.services";


describe("FavoriteButton", () => {
    it('has the default add to favorites text', async function () {
        const pokemon = new Pokemon(1, "algo", 1, 1, "algo" )

        const favoriteServices = new FavoriteServices()
        favoriteServices.getFavorites = jest.fn().mockReturnValue([])
        favoriteServices.existPokemon = jest.fn().mockReturnValue(-1)

        FavoriteButton.prototype.getFavorites = jest.fn().mockReturnValue([])
        FavoriteButton.prototype.findIndexPokemonInFavoriteList = jest.fn().mockReturnValue(-1)

        render(
            <FavoriteButton pokemon={pokemon} userId={123123}/>
        )

        const favoriteButton = await screen.getByRole("button")
        console.log(prettyDOM(favoriteButton))
        expect(favoriteButton).toBeInTheDocument()
        expect(favoriteButton).toHaveTextContent("Añadir a favoritos")
    });

    it('has \'delete from favorites\' text when user click on it', async function () {
        const user = userEvent.setup()
        const pokemon = new Pokemon(1, "algo", 1, 1, "algo" )
        render(
            <FavoriteButton pokemon={pokemon} userId={123123}/>
        )

        const favoriteButton = await screen.getByRole("button")
        expect(favoriteButton).toBeInTheDocument()

        console.log(prettyDOM(favoriteButton))
        await user.click(favoriteButton)
        console.log(prettyDOM(favoriteButton))

        expect(favoriteButton).toHaveTextContent("Eliminar de favoritos")

    });
})

