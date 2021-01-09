import {APIGatewayEvent, Context} from 'aws-lambda'
import {ProfilePage} from "./impl/profilePage";
import {DatabaseService} from "./impl/database.service";

// @ts-ignore
exports.handler = async function (event: APIGatewayEvent, context: Context) {

    let databaseService = new DatabaseService()

    if (event.httpMethod === "GET") {
        // GET http://localhost:8888/api/profile/search
        console.log(event.path)
        console.log(event.queryStringParameters)

        // GetAll from database.
        //let page = await databaseService.getPageUnfiltered(null)
        //console.log("Result:")
        //console.log(JSON.stringify(page))

        return {
            statusCode: 200,
            body: JSON.stringify({msg: "hello search"}),
        };

    } else {
        return {
            statusCode: 400,
            body: {msg: "search supports GET only"}
        }
    }

}

