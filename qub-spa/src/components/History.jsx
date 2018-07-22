import React, { Component } from 'react'
import { observer } from 'mobx-react';
import events from '../globals/Events';



@observer
export default class History extends Component {
    constructor(props){
        super(props)

    }
    
    render(){ 
        return (
        <div>
            { events.list.map(event => <div><span>{event[0]}</span><span>{JSON.stringify(event[1])}</span></div>) }
        </div>
        )
    }
}