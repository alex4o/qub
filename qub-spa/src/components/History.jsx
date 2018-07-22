import React, { Component } from 'react'
import { observer } from 'mobx-react';
import events from '../globals/Events';
import { Segment } from 'semantic-ui-react';
import HistoryItem from './items/HistoryItem'


@observer
export default class History extends Component {
    render(){ 
        return (
        <Segment className="history-feed">
            <h3 className="history-title">Event history</h3>
            { events.list.map((event, index) => <HistoryItem event={event} key={index}/>) }
        </Segment>
        )
    }
}