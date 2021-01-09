import {Identifyable} from "./identifyable.entity";
import {Approval} from "./approval.entity";

export class Competence implements Identifyable {
    id: string
    name: string
    isPublic: boolean
    description: string
    approved: Approval[]
}
