import {Client, query as q} from 'faunadb'
import {DATABASE_SECRET} from "../environment";
import {Identifyable} from "../entity/identifyable.entity";

// Fauna DB offers free tier NoSQL databases without credit card.
// See JavaScript docs: https://docs.fauna.com/fauna/current/tutorials/crud.html?lang=javascript
export class DatabaseService {
    private client: Client

    constructor() {
        this.client = new Client({secret: DATABASE_SECRET})
    }

    /**
     * Gets all items from the given collection.
     * @param collection Identifier of the collection. It is probably always "users" in our case.
     */
    public async getAll<T extends Identifyable>(collection: string): Promise<T[]> {
        let result = await this.client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection(collection))),
                q.Lambda(x => q.Get(x))
            )
        )

        // @ts-ignore
        return result.data.map(e => {
            let resultItem = e.data
            resultItem.id = e.ref.id
            return resultItem
        })
    }

    /**
     * Adds an item to the given collection.
     * @param collection Identifier of collection.  It is probably always "users" in our case.
     * @param item Some data in arbitrary format.
     */
    public async add<T extends Identifyable>(collection: string, item: T): Promise<T> {
        let result = await this.client.query(
            q.Create(
                q.Collection(collection), {
                    data: item
                }
            )
        );

        // @ts-ignore
        let resultItem = result.data
        // @ts-ignore
        resultItem.id = result.ref.id
        return resultItem as T
    }
}
