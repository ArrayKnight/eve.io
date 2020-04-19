import React, { ReactElement } from 'react'
import { css, Global } from '@emotion/core'
import { createMuiTheme } from '@material-ui/core'

export const GlobalStyles = (): ReactElement => (
    <Global
        styles={css`
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
                margin-top: 0;
            }
        `}
    />
)

export const theme = createMuiTheme()
