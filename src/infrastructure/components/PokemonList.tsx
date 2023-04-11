import * as React from 'react'
import { pokemonService } from '../../domain/services/pokemon.service'
import { Pokemon } from '../../domain/models/Pokemon'

export const PokemonList: React.FC = () => {

    const [pokemonList, setPokemonList] = React.useState<Pokemon[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            const data: Pokemon[] = await pokemonService.getPokemonList();
            setPokemonList( data )
        }
        fetchData()
    }, [])


    
    return (
        <table>
            <thead>
                <tr>
                    <th><p style={{textAlign: "center"}}>Name</p></th>
                    <th><p style={{textAlign: "center"}}>Weight</p></th>
                    <th><p style={{textAlign: "center"}}>Height</p></th>
                    <th><p style={{textAlign: "center"}}>Image</p></th>
                </tr>
            </thead>
            <tbody >
                {pokemonList.map((pokemon:Pokemon) => (
                    <tr key={pokemon.id}>
                        <td> <h4>{pokemon.name}</h4> </td>
                        <td> <p style={{textAlign: "center"}}>{pokemon.weight}</p> </td>
                        <td> <p style={{textAlign: "center"}}>{pokemon.height}</p> </td>
                        <td> <img src={pokemon.urlImage} width={100} /> </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}