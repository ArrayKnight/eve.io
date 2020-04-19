import axios from 'axios'

import { Dictionary, Geoname, OpenWeatherCurrent } from '~/types'
import { OPENWEATHER_APIKEY } from './constants'

const BASE_URL = 'https://api.openweathermap.org'
const DEFAULT_API_VERSION = '2.5'
const DEFAULT_UNIT = 'metric'

export class OpenWeatherService {
    private static _instance: OpenWeatherService

    public static get instance(): OpenWeatherService {
        if (!OpenWeatherService._instance) {
            OpenWeatherService._instance = new OpenWeatherService()
        }

        return OpenWeatherService._instance
    }

    private fetch = axios.create({
        baseURL: `${BASE_URL}/data/${DEFAULT_API_VERSION}/`,
        params: {
            APPID: OPENWEATHER_APIKEY,
            units: DEFAULT_UNIT,
        },
    })

    constructor() {
        if (!OpenWeatherService._instance) {
            OpenWeatherService._instance = this
        }

        return OpenWeatherService._instance
    }

    public getCurrentWeather = async ({
        lat,
        lng,
    }: Geoname): Promise<OpenWeatherCurrent> => {
        const { data } = await this.fetch({
            url: 'weather',
            params: {
                ...this.fetch.defaults.params,
                lat,
                lon: lng,
            },
        })

        return data
    }

    // More efficient (1 API call vs 3), but not all city IDs exist
    /*public getCurrentWeatherForEach = async (
        geonames: Geoname[],
    ): Promise<Dictionary<OpenWeatherCurrent>> => {
        const {
            data: { list },
        } = await this.fetch({
            url: 'group',
            params: {
                ...this.fetch.defaults.params,
                id: geonames.map(({ geonameId }) => geonameId).join(),
            },
        })

        return list.reduce(
            (dictionary, weather: OpenWeatherCurrent) => ({
                ...dictionary,
                [weather.id]: weather,
            }),
            {},
        )
    }*/

    public getCurrentWeatherForEach = async (
        geonames: Geoname[],
    ): Promise<Dictionary<OpenWeatherCurrent>> => {
        const responses = await Promise.all(
            geonames.map(this.getCurrentWeather),
        )

        return responses.reduce(
            (dictionary, weather) => ({
                ...dictionary,
                [weather.id]: weather,
            }),
            {},
        )
    }
}

const instance = new OpenWeatherService()

Object.freeze(instance)

export default instance
