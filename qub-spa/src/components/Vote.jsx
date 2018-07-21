import React, { Component } from 'react'
import { Segment, Button, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import VoteItem from "./items/VoteItem"

export default class Vote extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //state here
        }
    }

    render(){
        return(
            <Segment>
                <h1>Vote</h1>
                    <div style={{ margin: "auto", maxWidth: 500, display: "flex", flexWrap: "wrap" }}>
                    { Array.from(Array(99).keys()).map(index => {
                        return <VoteItem color="gray" index={index} />
                    })}
                    </div>
                    <div>
                        <Button color="green">Yes</Button>
                        <Button color="red">No</Button>
                    </div>
                   
                </Segment>
        );
    }
}