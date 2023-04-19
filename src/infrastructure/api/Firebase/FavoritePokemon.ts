import {addDoc, collection, getDoc, doc, updateDoc, setDoc, arrayUnion} from "firebase/firestore";
import {db} from "./Login.api";
import {Pokemon} from "../../../domain/models/Pokemon";

interface PokemonDBResult {
    Pokemons: Pokemon[]
}

export class FavoritePokemon {

    PATH = "FavoritePokemon"

    constructor() {
    }

    async getFromDB(userId: number): Promise<Pokemon[]>{
        if(!userId){
            return []
        }
        const docRef = doc(db, this.PATH, userId.toString())
        const docSnap = await getDoc(docRef)
        const data: PokemonDBResult  = (docSnap.data() || {}) as PokemonDBResult
        let pokemonList: Pokemon[] = [];

        if(data != null){
            const {Pokemons} = data
            pokemonList = Pokemons.map(({id, name, height, weight, urlImage}) => new Pokemon(id, name, height, weight, urlImage))
        }

        return pokemonList
    }

    async addToDB(userId: number, pokemon: Pokemon){

        const docRef = doc(db, this.PATH, userId.toString())
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            await updateDoc(docRef, {
                Pokemons: arrayUnion({
                    id: pokemon.id,
                    weight: pokemon.weight,
                    height: pokemon.height,
                    name: pokemon.name,
                    urlImage: pokemon.urlImage
                })
            })
        }else{
            await setDoc(doc(db, this.PATH, userId.toString()), {
                Pokemons: [
                    {
                        id: pokemon.id,
                        weight: pokemon.weight,
                        height: pokemon.height,
                        name: pokemon.name,
                        urlImage: pokemon.urlImage
                    }
                ]
            });
        }
    }
}