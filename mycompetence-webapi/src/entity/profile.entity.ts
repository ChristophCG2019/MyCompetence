import {Identifyable} from "./identifyable.entity";
import {Competence} from "./competence.entity"

export class Profile implements Identifyable {
    id: string
    userName: string
    firstName: string
    lastName: string
    image: string
    description: string
    competences: Competence[]
    coordinates: { lat: number, lon: number}
    
    /** fake number to allow sorting of search */
    distance: number
}
