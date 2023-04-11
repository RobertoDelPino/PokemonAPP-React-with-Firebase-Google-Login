import {Pokemon} from "../../domain/models/Pokemon";

export interface FavoritesPokemonDTO {
    id: number;
    name: string;
    height: number;
    weight: number;
    urlImage: string;
}