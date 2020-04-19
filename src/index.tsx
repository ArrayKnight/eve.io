import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'

import { GlobalStyles, theme } from '~/common'
import { App } from './App'

const Root = (): ReactElement => (
    <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Helmet titleTemplate="Eve | %s" />
            <App />
        </ThemeProvider>
    </StylesProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
