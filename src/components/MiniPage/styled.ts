import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Grid as GridBase, Paper } from '@material-ui/core'

import { theme } from '~/common'

export const Root = styled(GridBase)(
    (props) =>
        css`
            min-height: 75vh;
            max-width: 480px;
            margin: 0 auto;

            ${props.theme['overlay'] &&
            css`
                margin: 0;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                &::before {
                    content: '';
                    width: 100vw;
                    height: 100vh;
                    display: block;
                    background: ${theme.palette.common.white};
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: -1;
                    opacity: 0.25;
                }
            `}
        `,
)

export const Section = styled(Paper)`
    padding: ${theme.spacing(2)}px;
`

export const Grid = styled(GridBase)`
    width: 100%;
`
