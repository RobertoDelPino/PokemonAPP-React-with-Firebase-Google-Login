export class Pokemon{
    constructor(id: number, name: string, height: number, weight: number, urlImage: string){
        this.id = id
        this.name = name
        this.height = height
        this.weight = weight
        this.urlImage = urlImage

    }

    id: number
    name: string
    height: number
    weight: number
    urlImage: string

    // Las comprobaciones de si es un pokemon correcto deberían ir aquí
}