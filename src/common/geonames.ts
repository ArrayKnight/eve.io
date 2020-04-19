import Geonames from 'geonames.js'

import { Geoname, GeonameError, GeonameResults } from '~/types'
import { GEONAMES_USERNAME } from './constants'

export class GeonamesService {
    private static _instance: GeonamesService

    public static get instance(): GeonamesService {
        if (!GeonamesService._instance) {
            GeonamesService._instance = new GeonamesService()
        }

        return GeonamesService._instance
    }

    private api = new Geonames({ username: GEONAMES_USERNAME })

    constructor() {
        if (!GeonamesService._instance) {
            GeonamesService._instance = this
        }

        return GeonamesService._instance
    }

    public search = async (query: string): Promise<GeonameResults> => {
        const response: GeonameResults | GeonameError = await this.api.search({
            q: query,
            maxRows: 3,
        })

        if ('status' in response) {
            throw new Error(response.status.message)
        }

        return response
    }

    public findNearby = async ({
        geonameId,
        lat,
        lng,
    }: Geoname): Promise<GeonameResults> => {
        const response:
            | GeonameResults
            | GeonameError = await this.api.findNearbyPlaceName({
            lat,
            lng,
            cities: 'cities15000',
            radius: 300,
            maxRows: 4,
        })

        if ('status' in response) {
            throw new Error(response.status.message)
        }

        return {
            geonames: response.geonames.filter(
                (geoname: Geoname) => geoname.geonameId !== geonameId,
            ),
        }
    }
}

const instance = new GeonamesService()

Object.freeze(instance)

export default instance
