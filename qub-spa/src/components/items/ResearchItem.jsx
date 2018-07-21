import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

export default class Research extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //state here
        }
    }

    render(){
        return(
            <Segment classId="research-item">
                <div>
                    stuff1
                </div>
                <div>
                    stuff2
                </div>
            </Segment>
        );
    }
}