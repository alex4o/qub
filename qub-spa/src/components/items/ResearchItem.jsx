import React, { Component } from 'react'
import { Segment, Button, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import repo from "../../globals/Repo";

export default class Research extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //state here
        }
    }

    render(){
        return(
            <Segment classID="research-item">
                <div>
                    {/* TODO: Оправи */}
                    stuff1
                </div>
                <div className="button-area">
                    <Button color="blue">See more</Button>                    
                    <Button>Reproduce</Button>
                    <Button color="green">Fund</Button>
                </div>
            </Segment>
        );
    }
}