import React, { memo } from 'react'

import { Root, Content } from './styled'

interface Props {
    header?: React.ReactNode
    children: React.ReactNode
    footer?: React.ReactNode
}

export const Layout = memo(
    ({ header, children, footer }: Props): React.ReactElement => (
        <Root maxWidth="lg">
            {header}
            <Content>{children}</Content>
            {footer}
        </Root>
    ),
)
