import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Profile} from "../../../../mycompetence-webapi/src/entity/profile.entity";
import {environment} from "../../environments/environment";
import {SearchProfile} from "../entity/searchProfile";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {


  constructor(private httpclient: HttpClient) {
  }

  async searchForProfiles(query: string) : Promise<SearchProfile[]> {
    let userNameSearchTask = await this.httpclient.post(environment.baseUrl + "api/search", {
      username: query,
      cursor : "0"
    }).toPromise()

    console.log(environment.baseUrl)

    let competenceSearchTask = this.httpclient.post(environment.baseUrl + "api/search", {
      competence: query,
      cursor : "0"
    }).toPromise()

    let result = []
    // @ts-ignore
    let userResult = (await userNameSearchTask).data as SearchProfile[]
    // @ts-ignore
    let competenceResult = (await competenceSearchTask).data as SearchProfile[]

    userResult.forEach(e => result.push(e))
    competenceResult.forEach(e => result.push(e))

    // TODO: Maybe remove output
    console.log(JSON.stringify(result))
    return result
  }


  username: string
  area: { lat: number, lon: number, radius: number }
  competence: string
  /** use cursor for repetetive calls to recieve next result page */
  cursor: string

  async getProfileById(id: string): Promise<Profile> {
    let profile = await this.httpclient.get("" + id).toPromise() as Profile;

    return profile;
  }
}
