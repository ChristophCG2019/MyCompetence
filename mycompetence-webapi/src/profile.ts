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
                headers: {
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": '*',
                    'Content-Type': 'application.json',
                },
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
                headers: {
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": '*',
                    'Content-Type': 'application.json',
                },
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
                    headers: {
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                        'Access-Control-Allow-Origin': '*',
                        "Access-Control-Allow-Headers": '*',
                        'Content-Type': 'application.json',
                    },
                    body: JSON.stringify({msg: "item with id '" + pDelete.id + "' not found."})
                }
    
            } else {
                return {
                    statusCode: 204,
                    headers: {
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                        'Access-Control-Allow-Origin': '*',
                        "Access-Control-Allow-Headers": '*',
                        'Content-Type': 'application.json',
                    }
                    // no content
                }
            }
        case "OPTIONS":
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": '*',
                    'Content-Type': 'application.json',
                }
            }
        default:
            // GET http://localhost:8888/api/profile
            let id = event.path.substr("/api/profile/".length)
            if (id.length == 0) {
                // get all profiles
                //let cursor = event.body == null || event.body ? null : JSON.parse(event.body).id
                let res = await databaseService.getPageUnfiltered(null) as ProfilesPage

                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                        'Access-Control-Allow-Origin': '*',
                        "Access-Control-Allow-Headers": '*',
                        'Content-Type': 'application.json',
                    },
                    body: JSON.stringify(res)
                };

            } else {
                let res = await databaseService.getById('users', id)
                // @ts-ignore
                if (null != res.name && res.name === 'NotFound') {
                    return {
                        statusCode: 404,
                        headers: {
                            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                            'Access-Control-Allow-Origin': '*',
                            "Access-Control-Allow-Headers": '*',
                            'Content-Type': 'application.json',
                        },
                        body: JSON.stringify({msg: "item with id '" + id + "' not found."})
                    }
        
                } else {
                    return {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                            'Access-Control-Allow-Origin': '*',
                            "Access-Control-Allow-Headers": '*',
                            'Content-Type': 'application.json',
                        },
                        body: JSON.stringify(res)
                    }
                }
            }
    }
}

