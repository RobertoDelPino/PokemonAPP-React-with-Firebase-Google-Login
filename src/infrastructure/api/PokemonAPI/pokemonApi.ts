import { Pokemon } from "../../../domain/models/Pokemon";
import { PokemonListDTO } from "../../DTO/PokemonListDTO";
import {PokemonByIdDTO} from "../../DTO/PokemonByIdDTO";
import {Http} from "../../http/Http";
import {CountDTO} from "../../DTO/CountDTO";

export class PokemonApi{

    constructor() {
    }

    private COMMON_URL: string =  "http://127.0.0.1:3000/api"
    private HTTP = new Http(this.COMMON_URL)

    async getPokemonList(offset:number = 1): Promise<Pokemon[]> {
        const endpoint = "/Pokemon?offset=" + offset;
        const data: PokemonListDTO = await this.HTTP.get(endpoint)
        const pokemonList = data.PokemonList.map(({id, name, height, weight, urlImage}) => new Pokemon(id, name, height, weight, urlImage))

        return pokemonList
    }

    async getPokemonById (id: number): Promise<Pokemon>{
        const url = "/Pokemon/" + id;
        const data: PokemonByIdDTO = await this.HTTP.get(url)
        const pokemon = new Pokemon(Number(data.pokemon.id), data.pokemon.name, Number(data.pokemon.height), Number(data.pokemon.weight), data.pokemon.urlImage )

        return pokemon
    }

    async getPokemonListByName(name: string): Promise<Pokemon[]> {
        const url = "/Pokemon/find/" + name.toLowerCase();

        try{
            const data: PokemonListDTO = await this.HTTP.get(url)
            const pokemonList = data.PokemonList.map(({id, name, height, weight, urlImage}) => new Pokemon(id, name, height, weight, urlImage))
            return pokemonList
        }
        catch (error:any){
            throw new Error(error.message)
        }
    }

    async getAllPokemonCount() {
        const url = "/Pokemon/get/count";

        try{
            const count: CountDTO = await this.HTTP.get(url)
            return count
        }
        catch (error: any){
            throw new Error(error.message)
        }
    }
}
