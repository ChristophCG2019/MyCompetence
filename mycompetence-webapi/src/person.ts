import {APIGatewayEvent, Context} from 'aws-lambda'
import {Person} from "./entity/person.entity";
import {DatabaseService} from "./impl/database.service";

// @ts-ignore
exports.handler = async function (event: APIGatewayEvent, context: Context) {
    if (event.httpMethod == "POST") {
        // POST http://localhost:8888/api/person

        console.log("POST")

        let person = new Person()
        person.firstName = "Franz"
        person.lastName = "Bauer"

        return {
            statusCode: 200,
            body: JSON.stringify(person)
        }
    }

    // GET http://localhost:8888/api/person

    // Don't forget to set the DATABASE_SECRET key while developing. Do not check DATABASE_SECRET into the source control!
    let databaseService = new DatabaseService()

    // Add to database
    let addedItem = await databaseService.add("users", {
        id: "",
        firstName: "Franz",
        lastName: "Paul"
    })
    console.log("Added item:")
    console.log(JSON.stringify(addedItem))

    // GetAll from database.
    let data = await databaseService.getAll("users")
    console.log("Result:")
    console.log(JSON.stringify(data))

    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"}),
    };
}

