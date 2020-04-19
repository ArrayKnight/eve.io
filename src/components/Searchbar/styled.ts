import styled from '@emotion/styled'
import { Paper } from '@material-ui/core'

import { theme } from '~/common'

export const Form = styled.form`
    padding: ${theme.spacing(2)}px;
    border-radius: ${theme.shape.borderRadius}px;
    margin-top: ${theme.spacing(2)}px;
    background: ${theme.palette.background.paper};
    position: relative;
    z-index: 1;
`

export const Container = styled(Paper)`
    padding: ${theme.spacing(2)}px;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
`
