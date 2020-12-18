import {APIGatewayEvent, Context} from 'aws-lambda'
import {Person} from "./entity/person.entity";

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

    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"}),
    };
}

