import {getDoc, doc, updateDoc, setDoc, arrayUnion} from "firebase/firestore";
import {db} from "./Login.api";
import {Pokemon} from "../../../domain/models/Pokemon";

interface PokemonDBResult {
    Pokemons: Pokemon[]
}


export class FavoritePokemonApi {

    PATH = "FavoritePokemon"

    constructor() {
    }

    async getSnap(userId: string){
        const docRef = doc(db, this.PATH, userId)
        const docSnap = await getDoc(docRef)
        return docSnap
    }

    async getFromDB(userId: string): Promise<Pokemon[]>{
        if(!userId){
            return []
        }

        const docSnap = await this.getSnap(userId)
        const data: PokemonDBResult  = (docSnap.data() || {}) as PokemonDBResult
        let pokemonList: Pokemon[] = [];

        if(Object.keys(data).length != 0){
            const {Pokemons} = data
            pokemonList = Pokemons.map((pokemon: Pokemon) => new Pokemon(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, pokemon.urlImage))
        }

        return pokemonList
    }

    async addToDB(userId: string, pokemon: Pokemon){
        const docRef = doc(db, this.PATH, userId.toString())
        const docSnap = await getDoc(docRef)

        const data = {
            id: pokemon.id,
            weight: pokemon.weight,
            height: pokemon.height,
            name: pokemon.name,
            urlImage: pokemon.urlImage
        }

        if(docSnap.exists()){
            await updateDoc(docRef, { Pokemons: arrayUnion(data) })
        }else{
            await setDoc(doc(db, this.PATH, userId.toString()), { Pokemons: [data] });
        }
    }

    async updateDB(userId: string, pokemonList: Pokemon[]){
        const docRef = doc(db, this.PATH, userId)
        const docSnap = await getDoc(docRef)

        const dataToSend = pokemonList.map((pokemon) => {
            return {
                id: pokemon.id,
                weight: pokemon.weight,
                height: pokemon.height,
                name: pokemon.name,
                urlImage: pokemon.urlImage
            }
        })

        if(docSnap.exists()){
            await updateDoc(docRef, { Pokemons: dataToSend })
        }else{
            await setDoc(doc(db, this.PATH, userId.toString()), { Pokemons: [dataToSend] });
        }
    }
}