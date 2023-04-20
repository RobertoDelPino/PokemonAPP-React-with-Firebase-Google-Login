import {Header} from "./Header"
import '@testing-library/jest-dom'
import {render, screen, prettyDOM} from "@testing-library/react";

/*
*
* Use cases:
*   1. Se muestre header en la pantalla( no tiene sentido pero algo es algo )
*
* */

describe("Header should", () => {
    it('appear in the document', async function () {
        render(
            <Header userId={null}></Header>
        )

        const header = await screen.getByRole("banner")
        console.log(prettyDOM(header))
        expect(header).toBeInTheDocument()
    });

    it('has "Log In" text button if userId is null', async function () {
        render(
            <Header userId={null}></Header>
        )

        const header = await screen.getByRole("banner")
        const button = await screen.getByText("Log In")
        console.log(prettyDOM(header))
        expect(header).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    });
})