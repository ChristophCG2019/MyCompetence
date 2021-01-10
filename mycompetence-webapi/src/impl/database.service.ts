import {Client, query as q} from 'faunadb'
import {DATABASE_SECRET} from "../environment";
import { Identifyable } from '../entity/identifyable.entity';
import { ProfilesPage } from './profilesPage';
import { parseJSON } from "faunadb/src/_json";

//const { GeoSearch } = require("faunadb-geo")(q);
const PAGINATION_LIMIT = 25;

// Fauna DB offers free tier NoSQL databases without credit card.
// See JavaScript docs: https://docs.fauna.com/fauna/current/tutorials/crud.html?lang=javascript
export class DatabaseService {
    private client: Client

    constructor() {
        this.client = new Client({secret: DATABASE_SECRET})
    }

    /**
     * Returns profiles up to the size of PAGINATION_LIMIT. Starts at first item or at cursor position if set.
     * @param cursorId If null, function will return first page. Cursor id is the first id of the next page from pagination
     * and will be retrieved by any result (if there are further pages).
     */
    public async getPageUnfiltered(cursor?: string): Promise<ProfilesPage> {
        var paging = { size: PAGINATION_LIMIT }
        if (null != cursor) {
            // @ts-ignore
            paging.after =  parseJSON(cursor)
        }
        let result = await this.client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection('users')),
                paging),
                q.Lambda(x => q.Get(x))
            )
        )

        let p = new ProfilesPage()
        // @ts-ignore
        p.data = result.data.map(e => {
            let resultItem = e.data
            resultItem.id = e.ref.id
            return resultItem
        });

        // @ts-ignore
        if (null != result.after) {
            // @ts-ignore
            p.cursor = result.after
        }

        return p
    }

    /**
     * Returns profiles up to the size of PAGINATION_LIMIT. Starts at first item or at cursor position if set.
     * @param name Name to search for.
     * @param cursorId If null, function will return first page. Cursor id is the first id of the next page from pagination
     * and will be retrieved by any result (if there are further pages).
     */
    public async getPageForName(name: string, cursor?: string): Promise<ProfilesPage> {
        var paging = { size: PAGINATION_LIMIT }
        if (null != cursor) {
            // @ts-ignore
            paging.after = parseJSON(cursor)
        }

        let result = await this.client.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index("users_search_by_last"), name),
                    paging
                ),
                q.Lambda(x => q.Get(x))
            )
        )

        let p = new ProfilesPage()
        // @ts-ignore
        p.data = result.data.map(e => {
            let resultItem = e.data
            resultItem.id = e.ref.id
            return resultItem
        });

        // @ts-ignore
        if (null != result.after) {
            // @ts-ignore
            p.cursor = JSON.stringify(result.after)
        }

        return p
    }

    /**
     * Returns profiles up to the size of PAGINATION_LIMIT. Starts at first item or at cursor position if set.
     * @param competence Competence to search for.
     * @param cursorId If null, function will return first page. Cursor id is the first id of the next page from pagination
     * and will be retrieved by any result (if there are further pages).
     */
    public async getPageForCompetence(competence: string, cursor?: string): Promise<ProfilesPage> {
        var paging = { size: PAGINATION_LIMIT }
        if (null != cursor) {
            // @ts-ignore
            paging.after = parseJSON(cursor)
        }

        let result = await this.client.query(
            q.Map(
                q.Paginate(
                    q.Join(
                        q.Match(q.Index("users_search_by_competence"), competence),
                        q.Index("users_sort_by_approval_desc")
                    ),
                    paging
                ),
                q.Lambda((user, ref) => q.Get(ref))
            )
        )
        console.log(result)

        let p = new ProfilesPage()
        // @ts-ignore
        p.data = result.data.map(e => {
            let resultItem = e.data
            resultItem.id = e.ref.id
            return resultItem
        });

        // @ts-ignore
        if (null != result.after) {
            // @ts-ignore
            p.cursor = JSON.stringify(result.after)
        }

        return p
    }

    /**
     * Gets item with given id from given collection.
     * @param collection Identifier of the collection.
     * @param id Identifier of item.
     */
    public async getById<T extends Identifyable>(collection: string, id:string): Promise<T> {
        return this.client.query(
            q.Get(q.Ref(q.Collection(collection), id))
        ).then((res) => {
            console.log(res)

            // @ts-ignore
            res.data.id = res.ref.id
            // @ts-ignore
            return res.data as T

        }).catch((err) => {
            console.log(err)
            return err
        });
    }

    /**
     * Adds an item to the given collection.
     * @param collection Identifier of collection.  It is probably always "users" in our case.
     * @param item Some data in arbitrary format.
     */
    public async add<T extends Identifyable>(collection: string, item: T): Promise<T> {
        return this.client.query(
            q.Create(
                q.Collection(collection), {
                    data: item
                }
            )
        ).then((res) => {
            // @ts-ignore
            res.data.id = res.ref.id
            // @ts-ignore
            return res.data as T

        }).catch((err) => {
            console.log(err)
            return err
        });
    }

    /**
     * Updates an item in given collection.
     * @param collection Identifier of collection.
     * @param item Some data to update.
     */
    public async update<T extends Identifyable>(collection: string, item: T): Promise<T> {
        return this.client.query(
            q.Update(
                q.Ref(q.Collection(collection), item.id),
                { data: item}
            )
        ).then((res) => {
            console.log("UPDATED: " + res)
            // @ts-ignore
            return res.data as T

        }).catch((err) => {
            console.log(err)
            return err
        })
    }

    /**
     * Deletes an item from given collection.
     * @param collection Identifier of collection.
     * @param id Some data in arbitrary format.
     */
    public async delete<T extends Identifyable>(collection: string, id: string): Promise<T> {
        return this.client.query(
            q.Delete(
                q.Ref(q.Collection(collection), id)
            )
        ).then((ret) => {
            console.log(ret)
            // @ts-ignore
            return ret.data

        }).catch((err) => {
            console.log(err)
            return err
        });
    }

    /** helper functions to setup db */

    public async createSearchForLastnameIndex(): Promise<any> {
        return this.client.query(
            q.CreateIndex({
                name: "users_search_by_last",
                source: q.Collection("users"),
                terms: [
                    { field: ["data", "lastName"] }
                ]
            })

        ).then((ret) => {
            console.log(ret)
            return ret
        }).catch((err) => {
            console.log(err)
            return err
        })
    }

    public async createSearchForCompetenceIndex(): Promise<any> {
        return this.client.query(
            q.CreateIndex({
                name: "users_search_by_competence",
                source: q.Collection("users"),
                terms: [
                    { field: ["data", "competences", "name"] }
                ]
            })

        ).then((ret) => {
            console.log(ret)
            return ret
        }).catch((err) => {
            console.log(err)
            return err
        })
    }

    public async createSortForApprovalIndex(): Promise<any> {
        return this.client.query(
            q.CreateIndex({
                name: "users_sort_by_approval_desc",
                source: q.Collection("users"),
                terms: [
                    { field: ["ref"] }
                ],
                values: [
                    { field: ["data", "competences", "countApproved"], reverse: true },
                    { field: ["ref"] }
                ]
            })

        ).then((ret) => {
            console.log(ret)
            return ret
        }).catch((err) => {
            console.log(err)
            return err
        })
    }

    public async deleteIndex(name: string): Promise<any> {
        return this.client.query(
            q.Delete(
                q.Index(name)
            )

        ).then((ret) => {
            console.log(ret)
            return ret
        }).catch((err) => {
            console.log(err)
            return err
        })
    }
}
