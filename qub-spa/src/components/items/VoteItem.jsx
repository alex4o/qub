import React, { Component } from 'react'
import { Segment, Button, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react'

export default class VoteItem extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //state here
        }
    }

    render(){
        return(
            <Button color={this.props.color} style={{  marginBottom: 5, width: 40, padding: 10 }}>{this.props.index + 1}</Button>

            // <span className="vote-item" style={{ margin: 10, backgroundColor: this.props.color, display: "inline-block",}}></span>
        );
    }
}