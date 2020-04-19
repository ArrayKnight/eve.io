import React, { lazy, ReactElement } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'

interface Props {
    // TODO remove
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    factory: () => Promise<{ default: React.ComponentType<any> }>
}

function Page({
    factory,
}: Props): (props: RouteComponentProps) => ReactElement {
    const Component = lazy(factory)

    return (props) => {
        return <Component {...props} />
    }
}

export const Error = Page({ factory: () => import('./Error') })
export const Search = Page({ factory: () => import('./Search') })

export const routes: RouteProps[] = [
    {
        path: '/',
        render: Search,
    },
    {
        render: Error,
    },
]
