import {Pokemon} from "../../domain/models/Pokemon";

export class Http{
    baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async get<Response>(endpoint: string): Promise<Response>{
        try {
            const response = await fetch(this.baseUrl + endpoint)
            return await response.json() as Response
        }
        catch (error: any){
            // console.log(error)
            throw new Error(error.message)
        }
    }
}


