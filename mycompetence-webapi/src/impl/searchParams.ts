export interface SearchParameters {
    username: string
    area: { lat: number, lon: number, radius: number }
    competence: string
    /** use cursor for repetetive calls to recieve next result page */
    cursor: string
}