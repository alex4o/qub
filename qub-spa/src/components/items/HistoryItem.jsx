import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

export default class HistoryItem extends Component {

    render() {
        return(
            <Segment className={"history-item " + this.props.event[0]}>
                {this.props.event[0].match(/[A-Z][a-z]*/g).join(" ")}
            </Segment>
        )
    }
}