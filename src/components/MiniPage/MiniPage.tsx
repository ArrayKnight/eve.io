import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import { isNil, isUndefined } from 'lodash'
import { Typography } from '@material-ui/core'

import { Root, Section, Grid } from './styled'

interface Props {
    overlay?: boolean
    title?: string
    headline?: string
    sections?: React.ReactNode[]
    footer?: React.ReactNode
}

export const MiniPage = memo(
    ({
        overlay = false,
        title,
        headline = title,
        sections = [],
        footer,
    }: Props): React.ReactElement => {
        const hasTitle = !isUndefined(title)
        const hasHeadline = !isUndefined(headline)
        const hasSections = sections.length > 0
        const hasFooter = !isNil(footer)
        const contents = hasSections ? sections : [null]

        if (!hasTitle && !hasHeadline && !hasSections && !hasFooter) {
            return <></>
        }

        return (
            <>
                {hasTitle && <Helmet title={title} />}
                <Root
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                    spacing={2}
                    theme={{ overlay }}
                >
                    {contents.map((content, index) => (
                        <Grid item key={index}>
                            {index === 0 && hasHeadline && (
                                <Typography variant="h2">{headline}</Typography>
                            )}
                            {!!content && <Section>{content}</Section>}
                        </Grid>
                    ))}
                    {hasFooter && <Grid item>{footer}</Grid>}
                </Root>
            </>
        )
    },
)
