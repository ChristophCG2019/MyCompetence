import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Person} from "../../../../mycompetence-webapi/src/entity/person.entity";

@Injectable({
  providedIn: 'root',
})
export class PersonService {


  constructor(private httpclient: HttpClient) {
  }

  async getPersonById(id: string): Promise<Person> {
   // let person = await this.httpclient.get("baseurl/api/person/" + id).toPromise()
    let person = new Person()
    person.firstName = "Service Bauer"



    return person
  }
}
