import {APIGatewayEvent, Context} from 'aws-lambda'
import { ProfilesPage } from './impl/profilesPage';
import {DatabaseService} from "./impl/database.service";
import { SearchParameters } from './impl/searchParams';

// @ts-ignore
exports.handler = async function (event: APIGatewayEvent, context: Context) {

    let databaseService = new DatabaseService()

    if (event.httpMethod === "GET") {
        // GET http://localhost:8888/api/profile/search
        if (null == event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({msg: "provide search parameters \"impl/searchParams.ts\" in body" })
            }
        }
        let sp = JSON.parse(event.body) as SearchParameters
        let page = new ProfilesPage()
        if (null != sp.username) {
            page = await databaseService.getPageForName(sp.username, sp.cursor)

        } else if (null != sp.competence) {
            page = await databaseService.getPageForCompetence(sp.competence, sp.cursor)
        }

        return {
            statusCode: 200,
            body: JSON.stringify(page)
        };

    } else {
        /*
        // use POST method to start administrative tasks
        if (event.httpMethod === "POST") {
            //let res = await databaseService.createSearchForUsernameIndex()
            //let res = await databaseService.deleteIndex("users_search_by_username")

            //let res = await databaseService.createSearchForCompetenceIndex()
            //let res = await databaseService.deleteIndex("users_search_by_competence")

            //let res = await databaseService.createSortForApprovalAndDistanceIndex()
            //let res = await databaseService.deleteIndex("users_sort_by_approval_desc_and_distance_asc")

            //let res = await databaseService.createSortForDistanceIndex()
            //let res = await databaseService.deleteIndex("users_sort_by_distance_asc")

            return {
                statusCode: 200,
                body: JSON.stringify(res)
            }
        }
        */

        return {
            statusCode: 400,
            body: JSON.stringify({msg: "search supports GET only"})
        }
    }

}

