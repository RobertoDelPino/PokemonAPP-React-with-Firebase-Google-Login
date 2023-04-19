export class LocalStorage {

    constructor() {
    }

    get<Type>(name: string): Type{
        const data = JSON.parse(localStorage.getItem(name) || "[]")
        return data as Type
    }

    set<Type>(name: string, data: Type){
        const jsonData = JSON.stringify(data)
        localStorage.setItem(name, jsonData)
    }
}