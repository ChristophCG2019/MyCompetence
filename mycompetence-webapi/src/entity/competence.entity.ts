import {Identifyable} from "./identifyable.entity";
import {Approval} from "./approval.entity";

export class Competence implements Identifyable {
    id: string
    name: string
    isPublic: boolean
    description: string
    approved: Approval[]
    countApproved: number = 0

    public addApproval(userId: string) {
        this.approved.forEach(chk => {
            if (chk.userId === userId) {
                // @ts-ignore
                chk.date = Date.now()
                
            } else {
                var a = new Approval()
                a.userId = userId
                // @ts-ignore
                a.date = Date.now()
                this.countApproved = this.approved.push(a)
            }
        });
    }
}
