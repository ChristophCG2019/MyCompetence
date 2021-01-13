export class Profile {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    image: string;
    description: string;
    coordinates: { lat: number, lon: number};

    /** fake number to allow sorting of search */
    distance: number;
}
