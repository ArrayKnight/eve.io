import React, { ReactElement, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Layout, Loading } from './components'
import { routes } from './pages'

export const App = (): ReactElement => (
    <BrowserRouter>
        <Layout>
            <Suspense fallback={<Loading />}>
                <Switch>
                    {routes.map((route, index) => (
                        <Route
                            key={`${route.path || index}`}
                            exact={!!route.path}
                            {...route}
                        />
                    ))}
                </Switch>
            </Suspense>
        </Layout>
    </BrowserRouter>
)
