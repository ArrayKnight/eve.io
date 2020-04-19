import styled from '@emotion/styled'
import { CircularProgress } from '@material-ui/core'

import { theme } from '~/common'

export const Icon = styled(CircularProgress)`
    outline: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: none;

    &::before {
        content: '';
        width: 200%;
        height: 200%;
        border-radius: ${theme.shape.borderRadius}px;
        box-shadow: ${theme.shadows[1]};
        display: block;
        background: ${theme.palette.common.white};
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        transform: translate(-50%, -50%);
    }
`
