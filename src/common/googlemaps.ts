import { Loader } from '@googlemaps/js-api-loader'

import { Dictionary, Geoname } from '~/types'
import { GOOGLEMAPS_APIKEY } from './constants'

export class GoogleMapsService {
    private static _instance: GoogleMapsService

    public static get instance(): GoogleMapsService {
        if (!GoogleMapsService._instance) {
            GoogleMapsService._instance = new GoogleMapsService()
        }

        return GoogleMapsService._instance
    }

    private loader = new Loader({
        apiKey: GOOGLEMAPS_APIKEY,
    })

    constructor() {
        if (!GoogleMapsService._instance) {
            GoogleMapsService._instance = this
        } else {
            this.loader.load()
        }

        return GoogleMapsService._instance
    }

    public getDistances = async (
        origin: Geoname,
        destinations: Geoname[],
    ): Promise<Dictionary<string>> => {
        const service = new google.maps.DistanceMatrixService()

        return new Promise((resolve, reject) => {
            service.getDistanceMatrix(
                {
                    origins: [
                        {
                            lat: parseFloat(origin.lat),
                            lng: parseFloat(origin.lng),
                        },
                    ],
                    destinations: destinations.map(({ lat, lng }) => ({
                        lat: parseFloat(lat),
                        lng: parseFloat(lng),
                    })),
                    travelMode: google.maps.TravelMode.WALKING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                },
                ({ rows }, status) => {
                    if (status === google.maps.DistanceMatrixStatus.OK) {
                        const [results] = rows

                        resolve(
                            results.elements.reduce(
                                (
                                    dictionary,
                                    { distance: { text } },
                                    index,
                                ) => ({
                                    ...dictionary,
                                    [destinations[index].geonameId]: text,
                                }),
                                {},
                            ),
                        )
                    } else {
                        reject(status)
                    }
                },
            )
        })
    }
}

const instance = new GoogleMapsService()

Object.freeze(instance)

export default instance
