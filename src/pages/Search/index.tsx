import React, { memo, ReactElement, useState } from 'react'

import {
    GeonamesService,
    GoogleMapsService,
    OpenWeatherService,
} from '~/common'
import { Dictionary, Geoname, OpenWeatherCurrent } from '~/types'
import Search from './Search'

interface State {
    loading: boolean
    errors: Error[]
    selectedGeoname: Geoname | null
    searchedGeonames: Geoname[]
    nearbyGeonames: Geoname[]
    weather: Dictionary<OpenWeatherCurrent>
    distance: Dictionary<string>
}

const initialState: State = {
    loading: false,
    errors: [],
    selectedGeoname: null,
    searchedGeonames: [],
    nearbyGeonames: [],
    weather: {},
    distance: {},
}

export default memo(
    (): ReactElement => {
        const [state, setState] = useState<State>(initialState)

        async function selectGeoname(geoname: Geoname): Promise<void> {
            setState((prev) => ({
                ...prev,
                loading: true,
                selectedGeoname: geoname,
                nearbyGeonames: [],
                weather: {},
                distance: {},
            }))

            try {
                const { geonames } = await GeonamesService.instance.findNearby(
                    geoname,
                )

                setState((prev) => ({
                    ...prev,
                    nearbyGeonames: geonames,
                }))

                const weather = await OpenWeatherService.instance.getCurrentWeatherForEach(
                    [geoname, ...geonames],
                )
                const distance = await GoogleMapsService.instance.getDistances(
                    geoname,
                    geonames,
                )

                setState((prev) => ({
                    ...prev,
                    loading: false,
                    weather,
                    distance,
                }))
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    errors: [...prev.errors, err],
                }))
            }
        }

        async function search(query: string): Promise<void> {
            setState((prev) => ({
                ...prev,
                loading: true,
                errors: [],
            }))

            try {
                const { geonames } = await GeonamesService.instance.search(
                    query,
                )
                const geoname = geonames.find(
                    ({ name }) => name.toLowerCase() === query.toLowerCase(),
                )

                setState((prev) => ({
                    ...prev,
                    loading: false,
                    selectedGeoname: geoname || null,
                    searchedGeonames: geonames,
                }))

                if (geoname !== undefined) {
                    await selectGeoname(geoname)
                }
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    errors: [...prev.errors, err],
                }))
            }
        }

        return (
            <Search {...state} search={search} selectGeoname={selectGeoname} />
        )
    },
)
