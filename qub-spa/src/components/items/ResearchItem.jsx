import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import {observer} from 'mobx-react'
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
            <Segment classId="research-item">
                <div>
                    {repo.keys[0]}
                    stuff1
                </div>
                <div>
                    stuff2
                </div>
            </Segment>
        );
    }
}