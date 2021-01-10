import {APIGatewayEvent, Context} from 'aws-lambda'
import {Profile} from "./entity/profile.entity";
import {DatabaseService} from "./impl/database.service";
import { ProfilesPage } from './impl/profilesPage';

// @ts-ignore
exports.handler = async function (event: APIGatewayEvent, context: Context) {

    let databaseService = new DatabaseService()

    switch (event.httpMethod) {
        case "POST":
            // POST http://localhost:8888/api/profile
            let pAdd = JSON.parse(event.body) as Profile
            console.log("CREATE: " + JSON.stringify(pAdd))
            
            // Add to database
            let addedItem = await databaseService.add("users", pAdd)

            return {
                statusCode: 201,
                body: JSON.stringify(addedItem)
            }

        case "PUT":
            // PUT http://localhost:8888/api/profile
            let pUpdate = JSON.parse(event.body) as Profile
            console.log("PUT: " + JSON.stringify(pUpdate))
            
            // Add to database
            let updatedItem = await databaseService.update("users", pUpdate)

            return {
                statusCode: 200,
                body: JSON.stringify(updatedItem)
            }

        case "DELETE":
            // PUT http://localhost:8888/api/profile
            let pDelete = JSON.parse(event.body) as Profile
            console.log("DELETE: " + JSON.stringify(pDelete))
            
            // Add to database
            let delItem = await databaseService.delete("users", pDelete.id)
            // @ts-ignore
            if (null != delItem.name && delItem.name === 'NotFound') {
                return {
                    statusCode: 404,
                    body: JSON.stringify({msg: "item with id '" + pDelete.id + "' not found."})
                }
    
            } else {
                return {
                    statusCode: 204,
                    body: JSON.stringify(delItem)
                }
            }

        default:
            // GET http://localhost:8888/api/profile
            let id = event.path.substr("/api/profile/".length)
            if (id.length == 0) {
                // get all profiles
                let cursor = event.body == null ? null : JSON.parse(event.body).id
                let res = await databaseService.getPageUnfiltered(cursor) as ProfilesPage

                return {
                    statusCode: 200,
                    body: JSON.stringify(res)
                };

            } else {
                let res = await databaseService.getById('users', id)
                // @ts-ignore
                if (null != res.name && res.name === 'NotFound') {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({msg: "item with id '" + id + "' not found."})
                    }
        
                } else {
                    return {
                        statusCode: 200,
                        body: JSON.stringify(res)
                    }
                }
            }

    }

}

