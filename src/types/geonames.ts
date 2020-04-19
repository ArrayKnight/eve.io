export interface Geoname {
    adminCode1: string
    lng: string
    geonameId: number
    toponymName: string
    countryId: string
    fcl: string
    population: number
    countryCode: string
    name: string
    fclName: string
    // adminCodes1: {ISO3166_2: "WA"}
    countryName: string
    fcodeName: string
    adminName1: string
    lat: string
    fcode: string
}

export interface GeonameResults {
    totalResultsCount?: number
    geonames: Geoname[]
}

export interface GeonameError {
    status: {
        message: string
    }
}
