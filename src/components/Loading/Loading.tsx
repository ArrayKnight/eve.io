import React, { PureComponent } from 'react'
import { isEqual, isNull } from 'lodash'
import { Modal } from '@material-ui/core'

import { Icon } from './styled'

interface Props {
    delay: number
    isVisible: boolean
}

interface State {
    timedOut: boolean
}

export class Loading extends PureComponent<Props, State> {
    public static defaultProps = {
        delay: 250,
        isVisible: true,
    }

    public state = {
        timedOut: this.props.delay <= 0,
    }

    private timer: number | null = null

    public componentDidMount(): void {
        this.setTimer()
    }

    public componentDidUpdate(prevProps: Readonly<Props>): void {
        if (!isEqual(prevProps, this.props)) {
            this.setTimer()
        }
    }

    public componentWillUnmount(): void {
        this.clearTimer()
    }

    public render(): React.ReactNode {
        const { isVisible } = this.props
        const { timedOut } = this.state

        return (
            <Modal open={isVisible && timedOut}>
                <Icon />
            </Modal>
        )
    }

    private clearTimer = (): void => {
        if (!isNull(this.timer)) {
            clearTimeout(this.timer)

            this.timer = null
        }
    }

    private setTimer = (): void => {
        const { delay } = this.props

        if (delay > 0) {
            this.clearTimer()

            this.setState({ timedOut: false }, () => {
                this.timer = window.setTimeout(() => {
                    this.setState({ timedOut: true })
                }, delay)
            })
        }
    }
}
