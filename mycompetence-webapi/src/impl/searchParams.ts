export interface SearchParameters {
    name: string
    area: { lat: number, lon: number, radius: number }
    competence: string
}