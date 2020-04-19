import React, { memo, ReactElement, useState } from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import { Backdrop, Typography } from '@material-ui/core'

import { GOOGLEMAPS_APIKEY } from '~/common'
import { Loading, MiniPage, Searchbar } from '~/components'
import { Dictionary, Geoname, OpenWeatherCurrent } from '~/types'
import { Container } from './styled'

interface Props {
    loading: boolean
    errors: Error[]
    google: typeof google
    selectedGeoname: Geoname | null
    searchedGeonames: Geoname[]
    nearbyGeonames: Geoname[]
    weather: Dictionary<OpenWeatherCurrent>
    distance: Dictionary<string>
    search: (query: string) => Promise<void>
    selectGeoname: (geoname: Geoname) => Promise<void>
}

const DEFAULT_LOCATION = { lat: 48.1351, lng: 11.582 }

export const Search = memo(
    ({
        loading,
        errors,
        google,
        selectedGeoname,
        searchedGeonames,
        nearbyGeonames,
        weather,
        distance,
        search,
        selectGeoname,
    }: Props): ReactElement => {
        const [state, setState] = useState({
            activeGeoname: null,
            activeMarker: null,
        })
        const bounds = new google.maps.LatLngBounds()
        const geonames = [selectedGeoname, ...nearbyGeonames].filter(Boolean)

        geonames.forEach(({ lat, lng }) => {
            bounds.extend({ lat: parseFloat(lat), lng: parseFloat(lng) })
        })

        function onMarkerClick(geoname: Geoname): (props, marker) => void {
            return (props, marker) => {
                setState({
                    activeGeoname: geoname,
                    activeMarker: marker,
                })
            }
        }

        function onMapClicked(): void {
            if (state.activeGeoname !== null) {
                setState({
                    activeGeoname: null,
                    activeMarker: null,
                })
            }
        }

        return (
            <>
                <Searchbar
                    selected={selectedGeoname}
                    results={searchedGeonames}
                    search={search}
                    selectGeoname={selectGeoname}
                />
                <Container>
                    <Map
                        google={google}
                        zoom={8}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        initialCenter={DEFAULT_LOCATION}
                        bounds={bounds}
                        onClick={onMapClicked}
                    >
                        {geonames.map((geoname) => {
                            const { geonameId, name, lat, lng } = geoname

                            return (
                                <Marker
                                    key={`${geonameId}-marker`}
                                    name={name}
                                    position={{
                                        lat,
                                        lng,
                                    }}
                                    onClick={onMarkerClick(geoname)}
                                />
                            )
                        })}
                        {geonames.map((geoname) => {
                            const { geonameId, name, population } = geoname

                            return (
                                <InfoWindow
                                    key={`${geonameId}-info`}
                                    marker={state.activeMarker}
                                    visible={
                                        state.activeGeoname?.geonameId ===
                                        geonameId
                                    }
                                    onClose={onMapClicked}
                                >
                                    <>
                                        <Typography variant="h5">
                                            {name}
                                        </Typography>
                                        <Typography>
                                            Population: {population}
                                        </Typography>
                                        {weather[geonameId]?.main.temp && (
                                            <Typography>
                                                Temperature:{' '}
                                                {weather[geonameId]?.main.temp}
                                                &deg;C
                                            </Typography>
                                        )}
                                        {geonameId !==
                                            selectedGeoname?.geonameId && (
                                            <Typography>
                                                Distance: {distance[geonameId]}
                                            </Typography>
                                        )}
                                    </>
                                </InfoWindow>
                            )
                        })}
                    </Map>
                </Container>
                {loading && <Loading />}
                {errors.length > 0 && (
                    <Backdrop open={true}>
                        <MiniPage
                            overlay={true}
                            headline="Oops"
                            sections={errors.map(({ name, message, stack }) => (
                                <>
                                    {name && name !== 'Error' && (
                                        <Typography variant="body1">
                                            {name}
                                        </Typography>
                                    )}
                                    {message && (
                                        <Typography variant="body2">
                                            {message}
                                        </Typography>
                                    )}
                                    {stack && (
                                        <Typography variant="caption">
                                            {stack}
                                        </Typography>
                                    )}
                                </>
                            ))}
                        />
                    </Backdrop>
                )}
            </>
        )
    },
)

export default GoogleApiWrapper({
    apiKey: GOOGLEMAPS_APIKEY,
})(Search)
