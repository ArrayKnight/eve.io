import styled from '@emotion/styled'
import { Container } from '@material-ui/core'

import { theme } from '~/common'

export const Root = styled(Container)``

export const Content = styled.article`
    ${theme.breakpoints.up('md')} {
        margin: 0 ${theme.spacing(-1)}px;
    }
`
