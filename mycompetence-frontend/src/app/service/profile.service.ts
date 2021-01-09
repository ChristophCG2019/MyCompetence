import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Profile} from "../../../../mycompetence-webapi/src/entity/profile.entity";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {


  constructor(private httpclient: HttpClient) {
  }

  async getProfileById(id: string): Promise<Profile> {
    let person = await this.httpclient.get("baseurl/api/profile/" + id).toPromise()

    return person
  }
}
