import React, {
    ChangeEvent,
    FormEvent,
    memo,
    ReactElement,
    useState,
} from 'react'
import { List, ListItem, ListItemText, TextField } from '@material-ui/core'

import { Geoname } from '~/types'
import { Form, Container } from './styled'

interface Props {
    selected: Geoname | null
    results: Geoname[]
    search: (query: string) => Promise<void>
    selectGeoname: (geoname: Geoname) => Promise<void>
}

export const Searchbar = memo(
    ({ selected, results, search, selectGeoname }: Props): ReactElement => {
        const [query, setQuery] = useState('')

        function onChange(evt: ChangeEvent<HTMLInputElement>): void {
            setQuery(evt.target.value)
        }

        function onSubmit(evt: FormEvent): void {
            evt.preventDefault()

            search(query)
        }

        function onClickResult(geoname: Geoname): () => void {
            const { name, adminName1, countryName } = geoname

            return () => {
                setQuery(`${name}, ${adminName1}, ${countryName}`)

                selectGeoname(geoname)
            }
        }

        return (
            <Form onSubmit={onSubmit}>
                <TextField
                    fullWidth={true}
                    label="Location"
                    placeholder="Munich, Germany"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={query}
                    onChange={onChange}
                />
                {!selected && results.length > 0 && (
                    <Container elevation={3}>
                        <List component="nav">
                            {results.map((geoname) => {
                                const {
                                    geonameId,
                                    name,
                                    adminName1,
                                    countryName,
                                } = geoname

                                return (
                                    <ListItem
                                        key={geonameId}
                                        button={true}
                                        onClick={onClickResult(geoname)}
                                    >
                                        <ListItemText
                                            primary={`${name}, ${adminName1}, ${countryName}`}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Container>
                )}
            </Form>
        )
    },
)
